import { motion } from "framer-motion";
import type { VolunteerImageItem, VolunteerTextItem } from "../data/volunteer";

interface VolunteerImageCardProps {
  item: VolunteerImageItem;
  index: number;
}

/** Image card with darken-on-hover and text overlay */
export function VolunteerImageCard({ item, index }: VolunteerImageCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className={`group relative overflow-hidden cursor-default ${item.gridClass}`}
      style={{ borderRadius: "var(--radius)" }}
    >
    <img
      src={item.image}
      alt={item.title}
      className="absolute inset-0 w-full h-full object-cover"
    />
      {/* Default visible label */}
      <div className="absolute inset-0 flex items-end p-5 md:p-6 group-hover:opacity-0 transition-opacity duration-300">
        <span className="font-serif text-xl text-foreground/50">{item.title}</span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <p className="text-xs uppercase tracking-[0.2em] text-background/70">
          {item.year}
        </p>
        <h3 className="font-serif text-xl md:text-2xl text-background mt-1">
          {item.title}
        </h3>
        <p className="text-sm text-background/80 mt-1">{item.role}</p>
        <p className="text-sm text-background/70 mt-2 leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

interface VolunteerTextCardProps {
  item: VolunteerTextItem;
  index: number;
}

/** Text, achievement, leadership, or stat card */
export function VolunteerTextCard({ item, index }: VolunteerTextCardProps) {
  const isStat = item.type === "stat";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className={`
        border border-border bg-background p-5 md:p-6
        flex flex-col justify-between
        transition-shadow duration-300 hover:shadow-[var(--shadow-hover)]
        ${item.gridClass}
      `}
      style={{ borderRadius: "var(--radius)", boxShadow: "var(--shadow)" }}
    >
      {isStat ? (
        <>
          <p className="text-xs uppercase tracking-[0.2em] text-accent">{item.title}</p>
          <p className="font-serif text-5xl md:text-6xl text-foreground my-3">
            {item.stat}
          </p>
          <p className="text-muted text-sm leading-relaxed">{item.description}</p>
        </>
      ) : (
        <>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent mb-2">
              {item.type === "achievement"
                ? "Award"
                : item.type === "leadership"
                  ? "Leadership"
                  : "Project"}
            </p>
            <h3 className="font-serif text-xl md:text-2xl text-foreground">
              {item.title}
            </h3>
            {item.subtitle && (
              <p className="text-sm text-muted mt-1">{item.subtitle}</p>
            )}
          </div>
          <p className="text-muted text-sm leading-relaxed mt-4">{item.description}</p>
        </>
      )}
    </motion.article>
  );
}
