interface SectionHeadingProps {
  children: React.ReactNode;
  /** Optional muted subtitle beneath the heading */
  subtitle?: string;
  className?: string;
}

/** Large editorial heading used across module pages */
export default function SectionHeading({
  children,
  subtitle,
  className = "",
}: SectionHeadingProps) {
  return (
    <header className={`mb-10 md:mb-14 ${className}`}>
      <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-foreground leading-[1.05]">
        {children}
      </h1>
      {subtitle && (
        <p className="mt-4 text-muted text-lg md:text-xl max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </header>
  );
}
