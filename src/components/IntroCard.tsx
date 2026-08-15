import { motion } from "framer-motion";

export default function IntroCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="
        col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-1
        min-h-40 lg:min-h-0 h-full
        flex flex-col justify-between
        bg-gray-100 border border-border
        p-5 md:p-6 lg:p-7
      "
      style={{
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
      }}
    >
      <span
        className="inline-block w-8 h-0.5"
        aria-hidden
      />
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">
          Hello!
        </p>
        <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight text-foreground leading-[1.15]">
          I was curious to see if I could make a light themed tech portfolio and get away with it, so here we are...
        </h1>
      </div>
      <p className="text-muted text-sm leading-relaxed max-w-md">
        {/* So here we are! */}
      </p>
    </motion.div>
  );
}
