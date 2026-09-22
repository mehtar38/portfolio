import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import MermaidDiagram from "./MermaidDiagram";

interface PostBodyProps {
  markdown: string;
}

// GitHub Pages serves this site under a subpath (see vite.config.ts `base`); a raw
// "blog/<slug>/image1.png" from the agent needs that prefix to resolve.
function withBase(src: string): string {
  if (/^([a-z]+:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  const base = import.meta.env.BASE_URL;
  return `${base}${src.replace(/^\//, "")}`;
}

const components: Components = {
  img: ({ src, alt }) => (
    <img src={withBase(String(src ?? ""))} alt={alt ?? ""} loading="lazy" />
  ),
  a: ({ href, children }) => (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  code: ({ className, children, ...props }) => {
    const language = /language-(\w+)/.exec(className ?? "")?.[1];
    const code = String(children).replace(/\n$/, "");
    if (language === "mermaid") return <MermaidDiagram code={code} />;
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
};

/** Renders a post's markdown body, with Mermaid fenced blocks drawn as diagrams. */
export default function PostBody({ markdown }: PostBodyProps) {
  return (
    <div className="prose">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
