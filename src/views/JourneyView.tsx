import BackButton from "../components/BackButton";
import PageContainer from "../components/PageContainer";
import SectionHeading from "../components/SectionHeading";
import TimelineItem from "../components/TimelineItem";
import { journeyMilestones } from "../data/journey";

interface JourneyViewProps {
  onBack: () => void;
}

/** Professional + education journey — editorial timeline */
export default function JourneyView({ onBack }: JourneyViewProps) {
  return (
    <PageContainer className="!max-w-4xl">
      <BackButton onBack={onBack} />

      <SectionHeading subtitle="Places I've met all of my best friends!">
        Journey
      </SectionHeading>

      <div className="space-y-12 md:space-y-16">
        {journeyMilestones.map((milestone, index) => (
          <TimelineItem key={milestone.id} milestone={milestone} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}
