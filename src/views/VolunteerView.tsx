import BackButton from "../components/BackButton";
import PageContainer from "../components/PageContainer";
import SectionHeading from "../components/SectionHeading";
import { volunteerItems } from "../data/volunteer";
import { VolunteerImageCard, VolunteerTextCard } from "../components/VolunteerCard";

interface VolunteerViewProps {
  onBack: () => void;
}
export default function VolunteerView({ onBack }: VolunteerViewProps) {
  return (
    <PageContainer className="!max-w-6xl">
      <BackButton onBack={onBack} />

      <SectionHeading subtitle="No cause what am I gonna do with all this empathy and compassion?">
        Volunteer
      </SectionHeading>

      <div
        className="
          grid
          grid-cols-12
          auto-rows-[110px]
          gap-3 md:gap-4
        "
      >
        {volunteerItems.map((item, index) =>
          item.type === "image" ? (
            <VolunteerImageCard
              key={item.id}
              item={item}
              index={index}
            />
          ) : (
            <VolunteerTextCard
              key={item.id}
              item={item}
              index={index}
            />
          ),
        )}
      </div>
    </PageContainer>
  );
}