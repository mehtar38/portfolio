from . import state


def publish() -> str:
    topic = state.current_topic()
    slug = topic["slug"]

    human_src = state.HUMAN_DIR / f"{slug}.md"
    ai_src = state.AI_DIR / f"{slug}.md"
    missing = [p.name for p in (human_src, ai_src) if not p.exists()]
    if missing:
        raise SystemExit(f"Missing article(s) for '{slug}': {', '.join(missing)}")

    dest_dir = state.BLOG_DIR / slug
    dest_dir.mkdir(parents=True, exist_ok=True)
    (dest_dir / "human.md").write_text(human_src.read_text(encoding="utf-8"), encoding="utf-8")
    (dest_dir / "ai.md").write_text(ai_src.read_text(encoding="utf-8"), encoding="utf-8")
    print(f"Wrote {dest_dir.relative_to(state.ROOT)}/human.md and ai.md")

    topics = state.load("topics")
    if topic not in topics["published"]:
        topics["published"].append(topic)
    topics["current"] = None
    state.save("topics", topics)
    print(f"Marked '{topic['title']}' as published")

    print("\nRun these yourself:\n")
    print("  git add src/content/blog public/blog agent/data human_blog ai_blog")
    print(f'  git commit -m "blog: {topic["title"]}"')
    print("  git push")
    return slug


if __name__ == "__main__":
    publish()
