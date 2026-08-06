import { motion } from "framer-motion";
import type { JourneyMilestone } from "../data/journey";

interface TimelineItemProps {
  milestone: JourneyMilestone;
  index: number;
}

/** Editorial timeline card — no connecting line, alternates left/right */
export default function TimelineItem({ milestone, index }: TimelineItemProps) {
  const isLeft = milestone.align === "left";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
      className={`
        flex flex-col md:flex-row md:items-start gap-4 md:gap-8
        ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* Year column */}
<div className="flex flex-col items-center gap-14 min-w-[120px]">

        <span className="font-serif text-4xl md:text-3xl text-foreground/20 leading-none mt-6">
          {milestone.year}
        </span>

    <img
        src={milestone.logo}
        alt={milestone.title}
        className="w-20 h-20 object-contain"
    />

      </div>

      {/* Card */}
      <div
        className={`
          flex-1 max-w-2xl
          ${isLeft ? "md:mr-auto" : "md:ml-auto"}
        `}
      >
        <div
          className="border border-border bg-background p-6 md:p-8 transition-shadow duration-300 hover:shadow-[var(--shadow-hover)]"
          style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}
        >
<p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
  {milestone.category}
</p>

<h3 className="font-serif text-2xl md:text-3xl tracking-tight">
  {milestone.title}
</h3>

<p className="mt-2 text-muted text-base">
  {milestone.subtitle}
</p>

{milestone.description && (
  <p className="mt-6 text-sm md:text-base leading-relaxed text-muted">
    {milestone.description}
  </p>
)}

{milestone.artifacts && milestone.artifacts.length > 0 && (
  <div className="mt-8 flex flex-wrap gap-3">
    {milestone.artifacts.map((artifact) => (
      <a
        key={artifact.label}
        href={artifact.href}
        target="_blank"
        rel="noreferrer"
        className="
          border border-border
          px-4 py-2
          text-sm
          transition-colors duration-200
          hover:bg-foreground
          hover:text-background
        "
        style={{ borderRadius: "999px" }}
      >
        {artifact.label}
      </a>
    ))}
  </div>
)}
        </div>
      </div>
    </motion.article>
  );
}
