export type PageType =
  | "home"
  | "journey"
  | "projects"
  | "volunteer"
  | "interests"
  | "blog";

export type ModuleSize = "large" | "wide" | "tall" | "medium" | "small";

export interface ModuleConfig {
  id: Exclude<PageType, "home">;
  title: string;
  description: string;
  size: ModuleSize;
  /** Tailwind grid placement classes for asymmetrical layout */
  gridClass: string;
}
