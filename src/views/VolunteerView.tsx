import BackButton from "../components/BackButton";
import PageContainer from "../components/PageContainer";
import SectionHeading from "../components/SectionHeading";
import { VolunteerImageCard, VolunteerTextCard } from "../components/VolunteerCard";
import { volunteerItems } from "../data/volunteer";

interface VolunteerViewProps {
  onBack: () => void;
}

/** Mixed editorial gallery — images, text, achievements, and stats */
export default function VolunteerView({ onBack }: VolunteerViewProps) {
  return (
    <PageContainer className="!max-w-6xl">
      <BackButton onBack={onBack} />

      <SectionHeading subtitle="Lucky to have been the cause of some genuine smiles.">
        Volunteer
      </SectionHeading>

      <div className="grid grid-cols-12 auto-rows-auto gap-3 md:gap-4">
        {volunteerItems.map((item, index) =>
          item.type === "image" ? (
            <VolunteerImageCard key={item.id} item={item} index={index} />
          ) : (
            <VolunteerTextCard key={item.id} item={item} index={index} />
          ),
        )}
      </div>
    </PageContainer>
  );
}
