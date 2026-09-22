import re
import sys
from datetime import date
from pathlib import Path

import mammoth
from markdownify import markdownify

from . import state
from .llm import cloud

IMAGES_DIR = state.ROOT / "public" / "blog"


def docx_to_markdown(docx_path: Path, slug: str) -> str:
    out_dir = IMAGES_DIR / slug
    count = 0

    def save_image(image):
        nonlocal count
        count += 1
        ext = image.content_type.split("/")[-1].replace("jpeg", "jpg")
        name = f"image{count}.{ext}"
        out_dir.mkdir(parents=True, exist_ok=True)
        with image.open() as f:
            (out_dir / name).write_bytes(f.read())
        return {"src": f"blog/{slug}/{name}", "alt": f"Figure {count}"}

    with open(docx_path, "rb") as f:
        html = mammoth.convert_to_html(f, convert_image=mammoth.images.img_element(save_image)).value
    text = markdownify(html, heading_style="ATX", bullets="-")
    return re.sub(r"\n{3,}", "\n\n", text).strip() + "\n"


def convert_human_article(docx_path: Path | None = None) -> Path:
    topic = state.current_topic()
    slug = topic["slug"]
    if docx_path is None:
        docs = sorted(state.HUMAN_DIR.glob("*.docx"), key=lambda p: p.stat().st_mtime, reverse=True)
        named_like_topic = [d for d in docs if state.slugify(d.stem) == slug]
        if not (named_like_topic or docs):
            raise SystemExit(f"No .docx found in {state.HUMAN_DIR}")
        docx_path = (named_like_topic or docs)[0]

    body = docx_to_markdown(docx_path, slug)
    title = docx_path.stem
    # The docx repeats its title as the first line; the site renders the title itself.
    first = body.splitlines()[0].strip("# *_")
    if first.lower() == title.lower():
        body = "\n".join(body.splitlines()[1:]).lstrip()

    description = cloud(
        'Return JSON: {"description": "..."}\n\n' + body[:3000],
        json_out=True,
    )["description"].strip()

    frontmatter = state.frontmatter({
        "title": title, "description": description, "pubDate": date.today().isoformat(),
        "author": "human", "slug": slug,
    })
    dest = state.HUMAN_DIR / f"{slug}.md"
    dest.write_text(frontmatter + body, encoding="utf-8")
    print(f"Converted {docx_path.name} -> {dest.relative_to(state.ROOT)}")
    return dest


if __name__ == "__main__":
    convert_human_article(Path(sys.argv[1]) if len(sys.argv) > 1 else None)
