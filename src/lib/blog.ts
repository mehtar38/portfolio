export interface PostMeta {
  title: string;
  description: string;
  pubDate: string;
  slug: string;
  author: "human" | "ai";
  tone?: string;
  model?: string;
}

export interface Post {
  meta: PostMeta;
  body: string;
}

export interface PostPair {
  slug: string;
  human: Post;
  ai: Post;
}

/** Parses the simple `key: "JSON-quoted value"` frontmatter agent/state.py writes. */
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const text = raw.replace(/\r\n/g, "\n"); // agent output is written on Windows
  const match = text.match(/^---\n([\s\S]*?)\n---\n\n?([\s\S]*)$/);
  if (!match) return { meta: {}, body: text };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const rawValue = line.slice(i + 1).trim();
    try {
      meta[key] = JSON.parse(rawValue);
    } catch {
      meta[key] = rawValue;
    }
  }
  return { meta, body: match[2] };
}

// Vite reads these at build time, so publishing a post only needs `npm run build`.
const files = import.meta.glob("../content/blog/*/{human,ai}.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function toPost(raw: string, fallbackSlug: string, author: "human" | "ai"): Post {
  const { meta, body } = parseFrontmatter(raw);
  return {
    body,
    meta: {
      title: meta.title ?? fallbackSlug,
      description: meta.description ?? "",
      pubDate: meta.pubDate ?? "",
      slug: meta.slug ?? fallbackSlug,
      author: (meta.author as "human" | "ai") ?? author,
      tone: meta.tone,
      model: meta.model,
    },
  };
}

function loadPairs(): PostPair[] {
  const bySlug = new Map<string, { human?: Post; ai?: Post }>();
  for (const [path, raw] of Object.entries(files)) {
    const match = path.match(/content\/blog\/([^/]+)\/(human|ai)\.md$/);
    if (!match) continue;
    const [, slug, kind] = match;
    const entry = bySlug.get(slug) ?? {};
    entry[kind as "human" | "ai"] = toPost(raw, slug, kind as "human" | "ai");
    bySlug.set(slug, entry);
  }
  const pairs: PostPair[] = [];
  for (const [slug, { human, ai }] of bySlug) {
    if (human && ai) pairs.push({ slug, human, ai });
  }
  return pairs.sort((a, b) => (a.human.meta.pubDate < b.human.meta.pubDate ? 1 : -1));
}

export function getPosts(): PostPair[] {
  return loadPairs();
}

export function getPost(slug: string): PostPair | undefined {
  return loadPairs().find((p) => p.slug === slug);
}
