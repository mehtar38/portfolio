import json
import re
from pathlib import Path

DATA_DIR = Path(__file__).parent / "data"
ROOT = Path(__file__).resolve().parent.parent
HUMAN_DIR = ROOT / "human_blog"
AI_DIR = ROOT / "ai_blog"
BLOG_DIR = ROOT / "src" / "content" / "blog"


def load(name: str) -> dict:
    return json.loads((DATA_DIR / f"{name}.json").read_text(encoding="utf-8"))


def save(name: str, data: dict) -> None:
    (DATA_DIR / f"{name}.json").write_text(
        json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )


def slugify(title: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", title.split(":")[0].lower()).strip("-")
    return slug[:60].rstrip("-")


def current_topic() -> dict:
    current = load("topics")["current"]
    if not current:
        raise SystemExit("No topic selected yet. Run: python -m agent.topics")
    return current


def current_research() -> dict:
    research = load("research").get(current_topic()["slug"])
    if not research:
        raise SystemExit("No research for this topic yet. Run: python -m agent.research")
    return research


def frontmatter(fields: dict) -> str:
    lines = [f"{k}: {json.dumps(v, ensure_ascii=False)}" for k, v in fields.items()]
    return "---\n" + "\n".join(lines) + "\n---\n\n"
