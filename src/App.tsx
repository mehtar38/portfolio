import { useCallback, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import PageTransition from "./components/PageTransition";
import HomeView from "./views/HomeView";
import JourneyView from "./views/JourneyView";
import ProjectsView from "./views/ProjectsView";
import VolunteerView from "./views/VolunteerView";
import InterestsView from "./views/InterestsView";
import BlogView from "./views/BlogView";
import type { PageType } from "./types";

function App() {
  const [activePage, setActivePage] = useState<PageType>("home");
  const [direction, setDirection] = useState(1);

  const navigateTo = useCallback((page: Exclude<PageType, "home">) => {
    setDirection(1);
    setActivePage(page);
  }, []);

  const goHome = useCallback(() => {
    setDirection(-1);
    setActivePage("home");
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "journey":
        return <JourneyView onBack={goHome} />;
      case "projects":
        return <ProjectsView onBack={goHome} />;
      case "volunteer":
        return <VolunteerView onBack={goHome} />;
      case "interests":
        return <InterestsView onBack={goHome} />;
      case "blog":
        return <BlogView onBack={goHome} />;
      default:
        return <HomeView onNavigate={navigateTo} />;
    }
  };

  const isHome = activePage === "home";

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activePage={activePage} onNavigateHome={goHome} />

      {/* Home: lock to viewport on desktop. Other pages: scroll normally. */}
      <main
        className={`
          lg:ml-80 pt-18 lg:pt-0
          ${isHome ? "lg:h-screen lg:overflow-hidden" : "content-scroll"}
        `}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <PageTransition pageKey={activePage} direction={direction}>
            {renderPage()}
          </PageTransition>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
