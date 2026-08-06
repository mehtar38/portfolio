import type { ModuleConfig } from "../types";

/**
 * Home dashboard modules — explicit grid placement for a tight puzzle layout.
 * Desktop: 12-col × 3-row grid, every cell filled, no masonry gaps.
 */
export const modules: ModuleConfig[] = [
  {
    id: "blog",
    title: "Blog",
    description: "Thoughts in progress.",
    size: "small",
    gridClass:
      "col-span-6 lg:col-span-4 lg:col-start-9 lg:row-start-1 min-h-[140px] lg:min-h-0",
  },
  {
    id: "journey",
    title: "Journey",
    description: "My 'Been There, Done That'(s)",
    size: "medium",
    gridClass:
      "col-span-6 lg:col-span-4 lg:col-start-1 lg:row-start-2 min-h-[140px] lg:min-h-0",
  },
  {
    id: "projects",
    title: "Projects",
    description: "I swear I would've been an inventor in a different era",
    size: "wide",
    gridClass:
      "col-span-12 lg:col-span-8 lg:col-start-5 lg:row-start-2 min-h-[140px] lg:min-h-0",
  },
  {
    id: "volunteer",
    title: "Volunteer",
    description: "Community work and giving back.",
    size: "wide",
    gridClass:
      "col-span-12 lg:col-span-8 lg:col-start-1 lg:row-start-3 min-h-[140px] lg:min-h-0",
  },
  {
    id: "interests",
    title: "Interests",
    description: "(Outside of Tech)",
    size: "small",
    gridClass:
      "col-span-6 lg:col-span-4 lg:col-start-9 lg:row-start-3 min-h-[140px] lg:min-h-0",
  },
];
