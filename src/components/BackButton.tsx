import { HiArrowLeft } from "react-icons/hi";

interface BackButtonProps {
  onBack: () => void;
}

/** Consistent back navigation used across content pages */
export default function BackButton({ onBack }: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onBack}
      className="group flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors duration-200 mb-10 md:mb-14"
    >
      <HiArrowLeft
        size={16}
        className="transition-transform duration-200 group-hover:-translate-x-1"
      />
      Back
    </button>
  );
}
