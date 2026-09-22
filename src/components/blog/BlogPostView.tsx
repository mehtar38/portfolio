import { useState } from "react";
import { motion } from "framer-motion";
import BackButton from "../BackButton";
import PostBody from "./PostBody";
import type { PostPair } from "../../lib/blog";

interface BlogPostViewProps {
  pair: PostPair;
  onBack: () => void;
}

const tabs = [
  { key: "human" as const, label: "Written by me" },
  { key: "ai" as const, label: "Written by AI" },
];

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** One post, two takes — tabs switch between the human and AI articles on the same topic. */
export default function BlogPostView({ pair, onBack }: BlogPostViewProps) {
  const [active, setActive] = useState<"human" | "ai">("human");
  const post = pair[active];

  return (
    <div className="w-full max-w-3xl mx-auto px-6 py-10 md:px-12 md:py-16 lg:px-16 lg:py-20">
      <BackButton onBack={onBack} />

      <div className="flex gap-1 mb-10 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActive(tab.key)}
            className={`relative px-1 pb-3 mr-6 text-sm tracking-wide transition-colors duration-200 ${
              active === tab.key ? "text-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {tab.label}
            {active === tab.key && (
              <motion.span
                layoutId="blog-tab-underline"
                className="absolute left-0 right-0 -bottom-px h-[2px] bg-accent"
                transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              />
            )}
          </button>
        ))}
      </div>

      <motion.article
        key={active}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <header className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
            {formatDate(post.meta.pubDate)}
            {active === "ai" && post.meta.tone && <span> &middot; {post.meta.tone}</span>}
          </p>
          <h1 className="font-serif text-3xl md:text-4xl text-foreground tracking-tight leading-tight">
            {post.meta.title}
          </h1>
        </header>

        <PostBody markdown={post.body} />
      </motion.article>
    </div>
  );
}
