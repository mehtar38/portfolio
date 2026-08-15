import IntroCard from "../components/IntroCard";
import ModuleCard from "../components/ModuleCard";
import { modules } from "../data/modules";
import type { PageType } from "../types";

interface HomeViewProps {
  onNavigate: (page: Exclude<PageType, "home">) => void;
}

export default function HomeView({ onNavigate }: HomeViewProps) {
  return (
    <div className="w-full h-full lg:h-screen lg:max-h-screen lg:overflow-hidden">
      <div className="h-full px-5 py-6 md:px-8 md:py-8 lg:px-10 lg:py-8">
        <div
          className="
            grid grid-cols-12 gap-2.5 md:gap-3
            auto-rows-[minmax(140px,auto)]
            lg:h-[calc(100dvh-4rem)] lg:grid-rows-3 lg:auto-rows-fr
          "
        >
          <IntroCard />

          {modules.map((mod, index) => (
            <ModuleCard
              key={mod.id}
              title={mod.title}
              description={mod.description}
              size={mod.size}
              index={index + 1}
              onClick={() => onNavigate(mod.id)}
              className={mod.gridClass}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
