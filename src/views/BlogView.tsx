import { motion } from "framer-motion";
import BackButton from "../components/BackButton";
import PageContainer from "../components/PageContainer";

interface BlogViewProps {
  onBack: () => void;
}

/** Under-construction blog — intentional placeholder with tape effect */
export default function BlogView({ onBack }: BlogViewProps) {
  return (
    <PageContainer className="!max-w-3xl">
      <BackButton onBack={onBack} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative mt-8 md:mt-16"
      >
        {/* Construction tape — CSS only */}
        <div className="construction-tape construction-tape--top" aria-hidden>
          <span>UNDER CONSTRUCTION</span>
        </div>
        <div className="construction-tape construction-tape--bottom" aria-hidden>
          <span>COMING SOON</span>
        </div>

        {/* Dashed placeholder card */}
        <div
          className="relative border-2 border-dashed border-border bg-background/50 px-8 py-16 md:px-12 md:py-24 text-center overflow-hidden"
          style={{ borderRadius: "var(--radius)" }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-6">
            Blog
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground tracking-tight">
            Under Construction
          </h1>
          <p className="mt-6 text-muted text-base md:text-lg leading-relaxed max-w-md mx-auto">
            All the places my mind wanders.
          </p>

          {/* Decorative placeholder lines */}
          <div className="mt-10 flex flex-col items-center gap-3 opacity-30">
            <span className="block w-48 h-[2px] bg-border" />
            <span className="block w-32 h-[2px] bg-border" />
            <span className="block w-40 h-[2px] bg-border" />
          </div>
        </div>
      </motion.div>
    </PageContainer>
  );
}
