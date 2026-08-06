import type { PageType } from "../types";

/** Placeholder sidebar copy — top section changes per active page */
export const sidebarContent: Record<
  PageType,
  { heading: string; text: string }
> = {
  home: {
    heading: "",
    text: "Treat this and an unoptimized version of my CV and LinkedIn :)",
  },
  journey: {
    heading: "Journey",
    text: "Honestly, I think the grades reflect my hardwork and consistency more than anything. Here's to the all nighters!",
  },
  projects: {
    heading: "Projects",
    text: "On any random day, I always have some new idea or weird little observation I’m thinking about. These projects are just a translation of the ones that stuck!",
  },
  volunteer: {
    heading: "Volunteer",
    text: "Lucky to have been the cause of some genuine smiles",
  },
  interests: {
    heading: "Interests",
    text: "(Outside of Tech)",
  },
  blog: {
    heading: "Blog",
    text: "Writing is in progress. Check back soon for essays on engineering, design, and learning.",
  },
};
