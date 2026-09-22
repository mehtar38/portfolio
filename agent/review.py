import re
import sys

from . import state
from .llm import local

TONES = ["technical", "reflective", "opinion", "tutorial", "exploratory"]

RUBRICS = {
    "reflective": (
        "a claim that needs one concrete example, an emotional point that feels ungrounded, "
        "repetition of the same feeling, an abrupt transition that loses the reader",
        "intentional pivots, rhetorical questions, implied common knowledge, conversational asides",
    ),
    "technical": (
        "undefined jargon, claims without evidence, repetition, paragraphs drifting from the technical focus",
        "brief contextual asides, intentional analogies",
    ),
    "opinion": (
        "claims contradicting earlier points, assumptions the reader won't share, repetition of the same argument, "
        "paragraphs weakening the overall argument",
        "strong assertions, rhetorical devices, intentional provocation",
    ),
    "tutorial": (
        "steps assuming prior knowledge, ambiguous instructions, repetition, a broken logical sequence",
        "motivational asides, summary recaps",
    ),
    "exploratory": (
        "directions introduced but never resolved, assumptions closing off exploration, repetition of the same question",
        "open-ended conclusions, tangential observations, unanswered questions",
    ),
}

PROMPT = """
You are a strict book editor. Your job has two steps.

STEP 1: Read the article and identify its tone: {tones}.

STEP 2: Based on that tone, flag issues using these rubrics.
{rubrics}

RULES:
- Do NOT summarize, review overall, or compliment. Only flag issues.
- If a paragraph has no issue, skip it entirely.
- "observation" is at most two sentences and specific to that paragraph.
- Example of a good note: para 4, issue "Ungrounded claim", observation "You say AI always misses intent but give no example here."

Each paragraph is labelled [P<number>].

Article:
{article}
"""

SCHEMA = {
    "type": "object",
    "properties": {
        "tone": {"type": "string", "enum": TONES},
        "notes": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "para": {"type": "integer"},
                    "issue": {"type": "string"},
                    "observation": {"type": "string"},
                },
                "required": ["para", "issue", "observation"],
            },
        },
    },
    "required": ["tone", "notes"],
}


def load_article(directory, slug: str) -> tuple[str, "state.Path"]:
    """<slug>.md if it exists, otherwise the most recently edited .md in the folder."""
    path = directory / f"{slug}.md"
    if not path.exists():
        articles = sorted(directory.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)
        if not articles:
            raise SystemExit(f"No .md article found in {directory}")
        path = articles[0]
    return path.read_text(encoding="utf-8"), path


def numbered_paragraphs(text: str) -> str:
    """Drop frontmatter, then label every non-empty line [P1], [P2], ..."""
    text = re.sub(r"\A---\n.*?\n---\n", "", text, flags=re.DOTALL)
    text = re.sub(r"```.*?```", "[diagram]", text, flags=re.DOTALL)  # a code block is one paragraph
    lines = [l.strip() for l in text.splitlines() if l.strip() and not l.strip().startswith(":::")]
    return "\n".join(f"[P{i}] {line}" for i, line in enumerate(lines, 1))


def editor_notes(article: str) -> dict:
    rubrics = "\n".join(
        f'If tone is "{tone}":\n- Flag: {flag}\n- Do NOT flag: {skip}'
        for tone, (flag, skip) in RUBRICS.items()
    )
    prompt = PROMPT.format(
        tones=", ".join(TONES), rubrics=rubrics, article=numbered_paragraphs(article)
    )
    return local(prompt, schema=SCHEMA)


def run_review(directory=state.HUMAN_DIR) -> dict:
    slug = state.current_topic()["slug"]
    article, path = load_article(directory, slug)
    print(f"Reviewing {path.name} with the local model...")
    result = editor_notes(article)

    print(f"\nTone: {result['tone']}\n\n--- Editor Notes ---\n")
    for n in sorted(result["notes"], key=lambda n: n["para"]):
        print(f"[Para {n['para']}] {n['issue']} - {n['observation']}")
    return result


if __name__ == "__main__":
    run_review(state.AI_DIR if sys.argv[1:] == ["ai"] else state.HUMAN_DIR)
