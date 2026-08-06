import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  /** 1 = forward (into module), -1 = back (to home) */
  direction?: number;
  pageKey: string;
}

const ease = [0.4, 0, 0.2, 1] as const;

/** Smooth sliding transition between sections */
export default function PageTransition({
  children,
  direction = 1,
  pageKey,
}: PageTransitionProps) {
  return (
    <motion.div
      key={pageKey}
      custom={direction}
      initial={{ opacity: 0, x: direction * 40, y: direction * 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: direction * -40, y: direction * -8 }}
      transition={{ duration: 0.5, ease }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
