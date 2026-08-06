import BackButton from "../components/BackButton";
import PageContainer from "../components/PageContainer";
import ProjectSpread from "../components/ProjectSpread";
import SectionHeading from "../components/SectionHeading";
import { projects } from "../data/projects";

interface ProjectsViewProps {
  onBack: () => void;
}

/** Case-study inspired projects — large magazine spreads */
export default function ProjectsView({ onBack }: ProjectsViewProps) {
  return (
    <PageContainer className="!max-w-6xl">
      <BackButton onBack={onBack} />

      <SectionHeading subtitle="I swear I would've been an inventor in a different era.">
        Projects
      </SectionHeading>

      <div className="mt-4">
        {projects.map((project, index) => (
          <ProjectSpread key={project.id} project={project} index={index} />
        ))}
      </div>
    </PageContainer>
  );
}
