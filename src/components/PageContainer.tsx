interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/** Consistent content wrapper with generous editorial spacing */
export default function PageContainer({
  children,
  className = "",
}: PageContainerProps) {
  return (
    <div
      className={`w-full max-w-5xl mx-auto px-6 py-10 md:px-12 md:py-16 lg:px-16 lg:py-20 ${className}`}
    >
      {children}
    </div>
  );
}
