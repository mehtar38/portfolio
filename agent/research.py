import os

from tavily import TavilyClient

from . import state
from .llm import cloud

QUERY_PROMPT = """
You are helping a tech blogger research their next article.

Given the topic: {topic}, think about what the researcher would need to write it well.
Give targeted search queries that will be fed to a web search API.
Cover questions like:
- What information would be needed to support this topic?
- Is there trustworthy evidence (not just articles, but research papers or official documentation)?
- What directions could this topic branch into?

Return ONLY a JSON array:
[
  {{"query": "your search query here", "source_type": "technical explainer"}}
]

source_type must be one of: "research paper", "technical explainer", "historical", "official documentation", "counterargument"
"""

CURATE_PROMPT = """
You are a research editor helping a tech blogger write about: "{topic}"

Here are {count} raw search results. Your job:
1. Drop low quality sources (SEO farms, listicles, outdated content, paywalled with no preview).
2. Keep the best 8-10 sources that are actually citable and useful.
3. Prioritize research papers, official docs and reputable technical blogs.
4. Make sure the kept sources cover different angles, not the same point repeated.

For each source you keep, return its number "n" from the list below, plus:
- "summary": 2-3 sentences on what it covers
- "why_useful": one sentence
- "cite_as": one of "background", "evidence", "technical depth", "historical", "counterargument"

Raw results:
{sources}

Return ONLY a JSON array:
[{{"n": 1, "summary": "...", "why_useful": "...", "cite_as": "background"}}]
"""


def generate_queries(topic: str) -> list[dict]:
    return cloud(QUERY_PROMPT.format(topic=topic), json_out=True)


def fetch_sources(queries: list[dict], max_results: int = 5) -> list[dict]:
    tavily = TavilyClient(api_key=os.environ["TAVILY_API_KEY"])
    results, seen = [], set()
    for q in queries:
        print(f"  Searching: {q['query']}")
        response = tavily.search(query=q["query"], search_depth="advanced", max_results=max_results)
        for r in response["results"]:
            if r["url"] in seen:
                continue
            seen.add(r["url"])
            results.append({
                "title": r["title"],
                "url": r["url"],
                "content": r["content"],
                "source_type": q["source_type"],
            })
    return results


def curate(topic: str, sources: list[dict]) -> list[dict]:
    listing = "\n---\n".join(
        f"{i}. Title: {s['title']}\n   URL: {s['url']}\n   Type: {s['source_type']}\n   Content: {s['content'][:500]}"
        for i, s in enumerate(sources, 1)
    )
    picks = cloud(CURATE_PROMPT.format(topic=topic, count=len(sources), sources=listing), json_out=True)

    curated = []
    for pick in picks:
        n = pick.get("n")
        if not isinstance(n, int) or not 1 <= n <= len(sources):
            continue
        raw = sources[n - 1]  # title/url/content come from the search, never from the LLM
        curated.append({
            "id": f"S{len(curated) + 1}",
            "title": raw["title"],
            "url": raw["url"],
            "content": raw["content"],
            "summary": pick["summary"],
            "why_useful": pick["why_useful"],
            "cite_as": pick["cite_as"],
        })
    return curated


def run_research() -> dict:
    topic = state.current_topic()
    print(f"Researching: {topic['title']}")
    queries = generate_queries(topic["title"])
    sources = fetch_sources(queries)
    curated = curate(topic["title"], sources)

    for s in curated:
        print(f"\n{s['id']}. {s['title']}\n   {s['url']}\n   {s['cite_as'].upper()}: {s['summary']}")

    research = state.load("research")
    research[topic["slug"]] = {
        "topic": topic["title"],
        "queries": queries,
        "raw_source_count": len(sources),
        "curated_sources": curated,
    }
    state.save("research", research)
    return research[topic["slug"]]


if __name__ == "__main__":
    run_research()
