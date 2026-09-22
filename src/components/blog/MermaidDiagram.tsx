import { useEffect, useId, useRef, useState } from "react";

interface MermaidDiagramProps {
  code: string;
}

/** Renders a Mermaid flowchart client-side; the library loads only when a post needs it. */
export default function MermaidDiagram({ code }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId().replace(/:/g, "-");
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    import("mermaid").then(async ({ default: mermaid }) => {
      const isDark =
        document.documentElement.dataset.theme === "dark" ||
        (!document.documentElement.dataset.theme &&
          window.matchMedia("(prefers-color-scheme: dark)").matches);

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? "dark" : "neutral",
        fontFamily: "var(--font-sans)",
        securityLevel: "strict",
      });

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, code);
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      } catch {
        if (!cancelled) setError(true);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [code, id]);

  if (error) return null; // a broken diagram just disappears rather than breaking the post

  return (
    <div
      ref={ref}
      className="my-8 flex justify-center overflow-x-auto [&_svg]:max-w-full"
      aria-label="Diagram"
    />
  );
}
