import BackButton from "./BackButton";
import PageContainer from "./PageContainer";
import SectionHeading from "./SectionHeading";

interface PlaceholderPageProps {
  title: string;
  onBack: () => void;
}

/** Shared layout for module placeholder pages */
export default function PlaceholderPage({ title, onBack }: PlaceholderPageProps) {
  return (
    <PageContainer>
      <BackButton onBack={onBack} />
      <SectionHeading>{title}</SectionHeading>
      <p className="text-muted text-lg leading-relaxed max-w-2xl">
        This section is coming soon. Check back for updates — content for{" "}
        <span className="text-foreground">{title.toLowerCase()}</span> will
        live here.
      </p>
    </PageContainer>
  );
}
