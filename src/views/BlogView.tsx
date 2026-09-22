import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import BackButton from "../components/BackButton";
import PageContainer from "../components/PageContainer";
import SectionHeading from "../components/SectionHeading";
import BlogPostView from "../components/blog/BlogPostView";
import { getPosts, getPost } from "../lib/blog";

interface BlogViewProps {
  onBack: () => void;
}

function slugFromHash(): string | null {
  const match = window.location.hash.match(/^#\/blog\/(.+)$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Blog list, and the two-take post view when a post is selected. */
export default function BlogView({ onBack }: BlogViewProps) {
  const posts = getPosts();
  const [slug, setSlug] = useState<string | null>(slugFromHash);

  useEffect(() => {
    const onHashChange = () => setSlug(slugFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const openPost = (s: string) => {
    window.location.hash = `/blog/${s}`;
    setSlug(s);
  };

  const closePost = () => {
    window.location.hash = "/blog";
    setSlug(null);
  };

  const pair = slug ? getPost(slug) : undefined;
  if (slug && pair) {
    return <BlogPostView pair={pair} onBack={closePost} />;
  }

  return (
    <PageContainer className="!max-w-3xl">
      <BackButton onBack={onBack} />

      <SectionHeading subtitle="Every topic gets two takes: mine, and an AI agent's, written independently on the same prompt.">
        Writing
      </SectionHeading>

      {posts.length === 0 ? (
        <p className="text-muted text-lg leading-relaxed max-w-md">
          Nothing published yet. Check back soon.
        </p>
      ) : (
        <ul className="mt-4">
          {posts.map((pair, i) => (
            <motion.li
              key={pair.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="border-t border-border last:border-b"
            >
              <button
                type="button"
                onClick={() => openPost(pair.slug)}
                className="group w-full flex items-center justify-between gap-6 py-6 text-left"
              >
                <span>
                  <span className="block font-serif text-xl md:text-2xl text-foreground group-hover:text-accent transition-colors duration-200">
                    {pair.human.meta.title}
                  </span>
                  <span className="block mt-1.5 text-sm text-muted max-w-lg">
                    {pair.human.meta.description}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-muted uppercase tracking-wide">
                  {formatDate(pair.human.meta.pubDate)}
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}
