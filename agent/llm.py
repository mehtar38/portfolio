import json
import os
import time
from pathlib import Path

import ollama
from dotenv import load_dotenv
from google import genai
from google.genai import errors, types

ROOT = Path(__file__).resolve().parent.parent
load_dotenv(ROOT / ".env")

GEMINI_MODEL = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "qwen3:8b")
# Ollama silently truncates to 4096 tokens by default, which cuts off long prompts.
OLLAMA_NUM_CTX = int(os.getenv("OLLAMA_NUM_CTX", "8192"))

_client = None


def cloud(prompt: str, *, json_out: bool = False):
    global _client
    if _client is None:
        _client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    config = types.GenerateContentConfig(
        response_mime_type="application/json" if json_out else "text/plain"
    )
    for attempt in range(4):
        try:
            response = _client.models.generate_content(
                model=GEMINI_MODEL, contents=prompt, config=config
            )
            break
        except errors.ServerError:  # 503 "high demand" spikes are temporary
            if attempt == 3:
                raise
            time.sleep(5 * 2**attempt)
    return json.loads(response.text) if json_out else response.text.strip()


def local(prompt: str, *, schema: dict | None = None, think: bool = False):
    kwargs = {}
    if "qwen3" in OLLAMA_MODEL:
        kwargs["think"] = think  # qwen3 reasons by default, which is slow on CPU
    response = ollama.chat(
        model=OLLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}],
        format=schema,
        options={"num_ctx": OLLAMA_NUM_CTX},
        **kwargs,
    )
    text = response["message"]["content"].strip()
    return json.loads(text) if schema else text
