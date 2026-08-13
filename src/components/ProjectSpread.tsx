import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { Project } from "../data/projects";

interface ProjectSpreadProps {
  project: Project;
  index: number;
}

const visualLabels: Record<Project["visualType"], string> = {
  image: "Image Placeholder",
  video: "Video Placeholder",
  screenshot: "Screenshot Placeholder",
};

export default function ProjectSpread({ project, index }: ProjectSpreadProps) {
  const reverse = index % 2 === 1;

  return (
    <motion.section
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
      className="mb-24 md:mb-32 last:mb-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-5">
        {/* Main visual spread */}
        <div
          className={`
            lg:col-span-8
            ${reverse ? "lg:col-start-5 lg:order-2" : "lg:col-start-1 lg:order-1"}
          `}
        >
          <div
            className="border border-border overflow-hidden"
            style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}
          >
            {/* Visual placeholder */}
             {project.visualType === "image" && project.image ? (
    <img
      src={project.image}
      alt={project.title}
      className="w-full h-full object-cover"
    />
  ) : (
            <div className="relative aspect-16/10 bg-border/40 flex items-center justify-center">
              <div className="text-center px-6">
                <span className="text-xs uppercase tracking-[0.25em] text-muted">
                  {visualLabels[project.visualType]}
                </span>
                <p className="mt-2 font-serif text-2xl md:text-3xl text-foreground/40">
                  {project.title}
                </p>
              </div>
              {/* Decorative corner marks */}
              <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-muted/30" />
              <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-muted/30" />
            </div>
  )}

            {/* Content below visual */}
            <div className="p-6 md:p-8 lg:p-10 bg-background">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground tracking-tight">
                {project.title}
              </h2>
              <p className="mt-5 text-muted text-base md:text-lg leading-relaxed max-w-2xl">
                {project.description}
              </p>

              {/* Technology tags */}
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs tracking-wide text-muted border border-border"
                    style={{ borderRadius: "calc(var(--radius) / 2)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm text-foreground border border-border hover:border-accent hover:text-accent transition-colors duration-200"
                  style={{ borderRadius: "calc(var(--radius) / 2)" }}
                >
                  <FaGithub size={14} />
                  View GitHub
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm bg-accent text-background hover:opacity-90 transition-opacity duration-200"
                  style={{ borderRadius: "calc(var(--radius) / 2)" }}
                >
                  <FaExternalLinkAlt size={12} />
                  View Demo
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting info block */}
        <div
          className={`
            lg:col-span-4 flex flex-col justify-center
            ${reverse ? "lg:col-start-1 lg:order-1" : "lg:col-start-9 lg:order-2"}
          `}
        >
          <div
            className="border border-border bg-background p-6 md:p-8 h-full flex flex-col justify-center"
            style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}
          >
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-6">
              Project Details
            </p>
            <dl className="space-y-5">
              <div>
                {/* <dt className="text-xs text-muted uppercase tracking-wide">Role</dt> */}
                {/* <dd className="mt-1 text-foreground">{project.meta.role}</dd> */}
              </div>
              <div>
                <dt className="text-xs text-muted uppercase tracking-wide">Timeline</dt>
                <dd className="mt-1 text-foreground">{project.meta.timeline}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted uppercase tracking-wide">Implemenntation Details</dt>
<dd className="mt-1 text-muted text-sm leading-relaxed">
  <ul className="list-disc pl-5 space-y-1">
    {project.meta.stack.map((item, idx) => (
      <li key={idx}>{item}</li>
    ))}
  </ul>
</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
