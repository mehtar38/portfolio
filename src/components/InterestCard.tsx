import { motion } from "framer-motion";
import type { InterestBlock } from "../data/interests";

interface InterestCardProps {
  block: InterestBlock;
  index: number;
}

const sizeClasses: Record<InterestBlock["size"], string> = {
  quote: "col-span-12 row-span-3",
  large: "col-span-12 md:col-span-7 row-span-3",
  medium: "col-span-12 md:col-span-5 row-span-2",
  small: "col-span-12 md:col-span-4 row-span-1",
};

/** Editorial interest block */
export default function InterestCard({ block, index }: InterestCardProps) {
  const isQuote = block.size === "quote";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        margin: "-40px",
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
      }}
      whileHover={{
        y: -4,
      }}
      className={`
        ${sizeClasses[block.size]}

        relative
        overflow-hidden

        border
        border-border

        bg-background

        p-6
        md:p-8

        flex
        flex-col
        justify-between

        transition-shadow
        duration-300

        hover:shadow-[var(--shadow-hover)]
      `}
      style={{
        borderRadius: "var(--radius)",
        boxShadow: "var(--shadow)",
      }}
    >
      {/* Quote block */}
      {isQuote ? (
        <>
          <span
            className="
              w-12
              h-[2px]
              bg-accent
            "
          />

          <blockquote
            className="
              mt-8

              font-serif

              text-3xl
              md:text-5xl

              leading-tight

              tracking-tight
            "
          >
            "{block.copy}"
          </blockquote>

          <p
            className="
              mt-8

              text-xs

              uppercase

              tracking-[0.25em]

              text-muted
            "
          >
            Personal philosophy
          </p>
        </>
      ) : (
        <>
          <div>
            <span
              className="
                block

                w-8

                h-[2px]

                bg-accent/60

                mb-5
              "
            />

            <h3
              className="
                font-serif

                text-2xl

                md:text-3xl

                tracking-tight
              "
            >
              {block.title}
            </h3>

            <p
              className="
                mt-4

                text-muted

                leading-relaxed
              "
            >
              {block.copy}
            </p>
          </div>

          {/* Placeholder for icons/images */}
          {block.icon && (
            <block.icon
              className="
                absolute

                right-6

                bottom-6

                text-accent/20
              "
              size={70}
            />
          )}
        </>
      )}
    </motion.article>
  );
}
