"""Phase 4: the AI writes its own post on the same topic.

The agent decides its own angle and outline, whether it needs more research, whether a
flowchart helps, and when the draft is good enough. It never reads the human article,
so the two posts stay an honest comparison.
"""
import json
import re
import time
from datetime import date

from . import review, state
from .llm import OLLAMA_MODEL, cloud, local
from .research import fetch_sources

MAX_SEARCHES = 3      # extra web searches the agent may run on its own
MAX_REVISIONS = 2     # critique -> revise rounds before it must stop
MAX_NOTES = 6         # editor notes fed into one revision
NEW_SOURCES = 4       # sources kept from those extra searches

MARKER = re.compile(r"[ \t]*\[(S\d+(?:\s*,\s*S\d+)*)\]")
DIAGRAM_START = ("flowchart", "graph", "sequenceDiagram", "stateDiagram")

PLAN_SCHEMA = {
    "type": "object",
    "properties": {
        "title": {"type": "string"},
        "description": {"type": "string"},
        "tone": {"type": "string", "enum": review.TONES},
        "angle": {"type": "string"},
        "outline": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "heading": {"type": "string"},
                    "points": {"type": "array", "items": {"type": "string"}},
                    "sources": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["heading", "points", "sources"],
            },
        },
        "flowchart": {
            "type": "object",
            "properties": {"include": {"type": "boolean"}, "shows": {"type": "string"}},
            "required": ["include", "shows"],
        },
        "gaps": {"type": "array", "items": {"type": "string"}},
    },
    "required": ["title", "description", "tone", "angle", "outline", "flowchart", "gaps"],
}

PLAN_PROMPT = """
You are an autonomous writer planning a blog post for a developer audience.

Topic: {topic}

Research sources (refer to them by id):
{sources}

Decide the post's angle and structure yourself.
- "title": a specific, engaging title.
- "description": one sentence for a preview card.
- "tone": one of {tones}.
- "angle": the single idea the post argues, in 1-2 sentences. Specific and surprising, not a survey.
- "outline": 4-6 sections. Each has a heading, 2-4 concrete points, and the ids of the sources that back it (may be empty).
- "flowchart": include=true only if a flowchart would genuinely help the reader (the topic has a process or flow); "shows" says what it would show.
- "gaps": up to {max_searches} web search queries for evidence the sources are missing. Use [] if the sources are enough.
"""

DRAFT_PROMPT = """
You are an autonomous writer. Write the full blog post in Markdown, following this plan.

Title: {title}
Angle: {angle}
Outline:
{outline}

Sources (use only these ids):
{sources}

Rules:
- 900-1300 words. Begin with the opening paragraph directly: no title heading (the site adds it). Use `##` for section headings.
- The post should flow: each section leads into the next, and concrete examples come before abstractions.
- Every fact that comes from a source must end with its id in square brackets, e.g. "... [S3]". Use only the ids listed above.
- Do not invent facts, statistics, quotes or personal anecdotes. You are not a person with experiences.
- {flowchart_rule}
- Output only the Markdown.
"""

FLOWCHART_ON = (
    "Include exactly one Mermaid diagram in a ```mermaid fenced block, showing: {shows}. Use `flowchart TD`, "
    "at most 8 nodes, short labels with no quotes or special characters, placed where it helps."
)

REVISE_PROMPT = """
You are revising your own blog post after an editor's review.

Editor notes (paragraph numbers count each non-empty line):
{notes}

Fix every note, keep everything that already works, and keep the [S#] source ids and any mermaid block
(repair the mermaid block only if it is broken). Output only the full revised Markdown.

Draft:
{draft}
"""

VERIFY_PROMPT = """
You are a book editor fact-checking a blog post written by an AI, using the sources it had.
Facts in the post are tagged with source ids like [S3]. Sources:
{sources}

Check: (1) does each tagged claim match what its source says? (2) is any untagged factual claim wrong or
doubtful? Use your own knowledge as well as the sources. Return at most 6 issues, only real ones; an empty
list means the post is sound.

Return ONLY JSON: {{"issues": [{{"claim": "quote or paraphrase", "problem": "what is wrong", "fix": "how to fix it"}}]}}

Post:
{post}
"""

FIX_PROMPT = """
Fix these fact-check issues in the blog post below. Change only what the issues require, keep the [S#] ids and any
mermaid block, and output only the full corrected Markdown.

Issues:
{issues}

Post:
{post}
"""


def source_text(sources: list[dict], detail: bool) -> str:
    rows = []
    for s in sources:
        row = f"[{s['id']}] {s['title']} - {s.get('summary', '')}"
        if detail and s.get("content"):
            row += f"\n    Excerpt: {s['content'][:600]}"
        rows.append(row)
    return "\n".join(rows)


def strip_fence(text: str) -> str:
    """Models sometimes wrap the whole post in a ```markdown fence."""
    text = text.strip()
    match = re.fullmatch(r"```(?:markdown|md)?\n(.*)\n```", text, flags=re.DOTALL)
    return match.group(1).strip() if match else text


def drop_bad_diagrams(md: str, log) -> str:
    """A broken diagram would break the page, so remove any block that isn't recognisably Mermaid."""
    def check(match):
        body = match.group(1).strip()
        if body.startswith(DIAGRAM_START) and len(body.splitlines()) > 1:
            return match.group(0)
        log("dropped an invalid mermaid block")
        return ""
    return re.sub(r"```mermaid\n(.*?)```", check, md, flags=re.DOTALL)


def search_more(queries: list[str], sources: list[dict], log) -> list[dict]:
    """The agent's own research: run its queries, keep a few new sources."""
    known = {s["url"] for s in sources}
    try:
        found = fetch_sources([{"query": q, "source_type": "technical explainer"} for q in queries], max_results=3)
    except Exception as e:  # a failed search should not stop the post
        log(f"extra search failed: {e}")
        return []
    added = []
    for raw in found:
        if raw["url"] in known or len(added) >= NEW_SOURCES:
            continue
        known.add(raw["url"])
        added.append({
            "id": f"S{len(sources) + len(added) + 1}", "title": raw["title"], "url": raw["url"],
            "content": raw["content"], "summary": raw["content"][:200], "why_useful": "found by the writer agent",
            "cite_as": "background", "added_by": "writer",
        })
    return added


def build_final(draft: str, sources: list[dict], plan: dict, tone: str) -> tuple[str, list[str]]:
    """Strip [S#] markers, add the list of sources actually used, add frontmatter."""
    by_id = {s["id"]: s for s in sources}
    used = []
    for match in MARKER.finditer(draft):
        for sid in re.split(r"\s*,\s*", match.group(1)):
            if sid in by_id and sid not in used:
                used.append(sid)
    body = MARKER.sub("", draft).strip()
    # the model sometimes repeats its title as its own heading despite being told not to
    body = re.sub(rf"\A#{{1,2}}\s*{re.escape(plan['title'])}\s*\n+", "", body, flags=re.IGNORECASE)

    if used:
        body += "\n\n## Sources\n\n" + "\n".join(f"- [{by_id[i]['title']}]({by_id[i]['url']})" for i in used)
    front = state.frontmatter({
        "title": plan["title"], "description": plan["description"], "pubDate": date.today().isoformat(),
        "author": "ai", "model": OLLAMA_MODEL, "tone": tone, "slug": state.current_topic()["slug"],
    })
    return front + body + "\n", used


def run_writer() -> str:
    topic = state.current_topic()
    slug = topic["slug"]
    research = state.load("research").get(slug)
    if not research:
        raise SystemExit("No research for this topic yet. Run: python -m agent.research")
    sources = research["curated_sources"]

    run = {"model": OLLAMA_MODEL, "steps": []}
    started = time.time()

    def log(message: str):
        print(f"[{(time.time() - started) / 60:5.1f} min] {message}")
        run["steps"].append(message)

    print(f"Writing with {OLLAMA_MODEL} (local, CPU: expect this to take a while)\n")

    log("planning")
    plan = local(
        PLAN_PROMPT.format(topic=topic["title"], sources=source_text(sources, False),
                           tones=", ".join(review.TONES), max_searches=MAX_SEARCHES),
        schema=PLAN_SCHEMA,
    )
    run["plan"] = plan
    log(f"angle: {plan['angle']}")

    gaps = [g for g in plan["gaps"] if g.strip()][:MAX_SEARCHES]
    if gaps:
        log(f"decided the research has gaps, searching: {gaps}")
        added = search_more(gaps, sources, log)
        sources = sources + added
        log(f"added {len(added)} source(s)")
        if added:
            research["curated_sources"] = sources
            all_research = state.load("research")
            all_research[slug] = research
            state.save("research", all_research)
    else:
        log("decided the research is enough")

    outline = "\n".join(
        f"- {s['heading']}: " + "; ".join(s["points"]) + (f" (sources: {', '.join(s['sources'])})" if s["sources"] else "")
        for s in plan["outline"]
    )
    flowchart = plan["flowchart"]
    log(f"flowchart: {'yes, showing ' + flowchart['shows'] if flowchart['include'] else 'no'}")

    log("drafting")
    draft = strip_fence(local(DRAFT_PROMPT.format(
        title=plan["title"], angle=plan["angle"], outline=outline, sources=source_text(sources, True),
        flowchart_rule=FLOWCHART_ON.format(shows=flowchart["shows"]) if flowchart["include"] else "Do not include a diagram.",
    )))
    draft = drop_bad_diagrams(draft, log)

    tone = plan["tone"]
    for round_no in range(1, MAX_REVISIONS + 1):
        log(f"critique round {round_no}")
        result = review.editor_notes(MARKER.sub("", draft))
        tone, notes = result["tone"], result["notes"][:MAX_NOTES]
        if not notes:
            log("editor found nothing to fix, stopping")
            break
        log(f"editor left {len(notes)} note(s), revising")
        text = "\n".join(f"[Para {n['para']}] {n['issue']} - {n['observation']}" for n in notes)
        draft = drop_bad_diagrams(strip_fence(local(REVISE_PROMPT.format(notes=text, draft=draft))), log)

    log("fact-check with Gemini (once)")
    check = cloud(VERIFY_PROMPT.format(sources=source_text(sources, True), post=draft), json_out=True)
    issues = check.get("issues", [])
    run["fact_check"] = issues
    if issues:
        log(f"Gemini flagged {len(issues)} issue(s), fixing once locally")
        text = "\n".join(f"- {i['claim']}: {i['problem']} Fix: {i['fix']}" for i in issues)
        draft = drop_bad_diagrams(strip_fence(local(FIX_PROMPT.format(issues=text, post=draft))), log)
    else:
        log("Gemini found no issues")

    final, used = build_final(draft, sources, plan, tone)
    log(f"used {len(used)} of {len(sources)} sources: {', '.join(used) or 'none'}")

    state.AI_DIR.mkdir(exist_ok=True)
    dest = state.AI_DIR / f"{slug}.md"
    dest.write_text(final, encoding="utf-8")
    (state.DATA_DIR / "runs").mkdir(exist_ok=True)
    run["used_sources"] = used
    (state.DATA_DIR / "runs" / f"{slug}.json").write_text(json.dumps(run, indent=2, ensure_ascii=False), encoding="utf-8")
    log(f"wrote {dest}")
    return final


if __name__ == "__main__":
    run_writer()
