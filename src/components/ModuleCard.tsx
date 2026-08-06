import { motion } from "framer-motion";
import type { ModuleSize } from "../types";

interface ModuleCardProps {
  title: string;
  description: string;
  size?: ModuleSize;
  index: number;
  onClick: () => void;
  className?: string;
}

const sizeStyles: Record<ModuleSize, string> = {
  large: "p-6 lg:p-8",
  wide: "p-5 lg:p-6",
  tall: "p-5 lg:p-6",
  medium: "p-5 lg:p-6",
  small: "p-4 lg:p-5",
};

const titleStyles: Record<ModuleSize, string> = {
  large: "text-3xl lg:text-4xl",
  wide: "text-2xl lg:text-3xl",
  tall: "text-2xl lg:text-3xl",
  medium: "text-xl lg:text-2xl",
  small: "text-xl lg:text-2xl",
};

/** Dashboard card — fills grid cell, subtle hover lift */
export default function ModuleCard({
  title,
  description,
  size = "medium",
  index,
  onClick,
  className = "",
}: ModuleCardProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      whileHover={{
        y: -4,
        boxShadow: "var(--shadow-hover)",
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
      }}
      whileTap={{ scale: 0.995 }}
      className={`
        group relative flex flex-col justify-between text-left
        h-full min-h-0
        bg-background border border-border
        cursor-pointer overflow-hidden
        transition-[box-shadow] duration-300 ease-out
        ${sizeStyles[size]} ${className}
      `}
      style={{
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
      }}
    >
      <div className="relative z-10 flex flex-col justify-between h-full gap-3 lg:gap-4">
        <span
          className="inline-block w-6 h-[2px] bg-accent shrink-0 transition-all duration-300 ease-out group-hover:w-10"
          aria-hidden
        />
        <div className="flex-1 min-h-0 flex flex-col justify-center">
          <h2
            className={`font-serif font-normal tracking-tight text-foreground leading-none ${titleStyles[size]}`}
          >
            {title}
          </h2>
          <p className="mt-2 text-muted text-xs lg:text-sm leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>
        <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-muted group-hover:text-accent transition-colors duration-300 shrink-0">
          Open →
        </span>
      </div>
    </motion.button>
  );
}
