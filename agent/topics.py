"""Phase 1: suggest topics, let the human pick one (or type their own)."""
import json

from . import state
from .llm import cloud

PROMPT = """
You are helping a tech blogger plan their next article.

Previously written topics:
{history}

Suggest 6 more topics to choose from. Instructions about choosing topics:
- It can be an intuitive topic. For example, 'how pressing a key on the keyboard is translated to the screen.'
  Because typing is something everyone does, but not many know how it goes to the screen internally.
- It can be an abstract/generalised but accurate fact. For example, 'An LLM is not intelligent in the cognitive sense, it merely predicts based on probability.'
  Because it is an accurate fact and still requires an interesting way of thought.
- It can be a book quote. For example, 'Hardware: the parts of a computer that can be kicked' or 'Any problem in computer science can be solved with another layer of indirection'
  Because these topics catch your attention but at the same time can branch out into multiple approaches of thought.
- You may occasionally suggest topics from other fields that can be written through the lens of Computer Science. For example, 'The Ship of Theseus' from philosophy can be applied to: 1. The company Meta (originally FB) 2. The way computers have evolved from a room-sized machine to a microchip. Is it still the same?
  Because this evokes creative thought.
- Best example: 'all a computer can do is addition.' It sounds like a perfect thought-provoking title and can go in various directions: hardware, gates and adders, how tasks flow inside a computer.
- Bad example: 'The cloud is just someone else's computer.' Everyone already knows this. No creative direction.
- Bad example: 'Why do computers have bugs?' Too generic, no surprising angle.
- Most importantly, every suggestion must induce creative thought or give something to think about.

Before suggesting a topic, ask yourself: would a developer already know this and shrug? If yes, discard it.
The goal is to make someone stop and think "wait... actually, how does that work?" or "I never thought about it that way."

Return ONLY a JSON array of 6 title strings, no explanation.
"""


def suggest_topics() -> dict:
    data = state.load("topics")
    history = [t["title"] for t in data["published"]]
    prompt = PROMPT.format(history=json.dumps(history) if history else "None yet")

    titles = [t.strip() for t in cloud(prompt, json_out=True)]
    print("\n--- Suggested Topics ---")
    for i, title in enumerate(titles, 1):
        print(f"{i}. {title}")

    choice = input("\nPick a number or type your own topic: ").strip()
    if choice.isdigit() and 1 <= int(choice) <= len(titles):
        title = titles[int(choice) - 1]
    else:
        title = choice.strip("\"'")
    if not title:
        raise SystemExit("No topic chosen.")

    for t in titles:
        if t not in data["suggested"]:
            data["suggested"].append(t)
    data["current"] = {"title": title, "slug": state.slugify(title)}
    state.save("topics", data)

    print(f"\nSelected: {title}")
    return data["current"]


if __name__ == "__main__":
    suggest_topics()
