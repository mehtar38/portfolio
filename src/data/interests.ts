import {
  SiDuolingo,
} from "react-icons/si";

export type InterestSize = "quote" | "large" | "medium" | "small";

import type { IconType } from "react-icons";

export interface InterestBlock {
  id: string;
  title: string;
  copy: string;
  size: "quote" | "large" | "medium" | "small";
  gridClass?: string;
  icon?: IconType;
}

export const featuredQuote =
  "Nothing is boring, you just haven't spent enough time with it.";

export const interestBlocks: InterestBlock[] = [
  {
    id: "quote",
    title: "",
    copy: featuredQuote,
    size: "quote",
    gridClass: "col-span-12 md:col-span-8 row-span-2 min-h-[200px] md:min-h-[280px]",
  },
  {

 id:"duolingo",
 title:"Spanish",
 copy:"720+ day streak. Still learning.",
 size:"medium",
 icon: SiDuolingo,

  },
  {
    id: "guitar",
    title: "Guitar",
    copy: "Average guitarist. Exceptional at convincing people I practice.",
    size: "small",
    gridClass: "col-span-6 md:col-span-4 min-h-[140px]",
  },
  {
    id: "physics",
    title: "Physics",
    copy: "One YouTube video turns into a 3 hour rabbit hole.",
    size: "medium",
    gridClass: "col-span-12 md:col-span-6 min-h-[160px]",
  },
  {
    id: "reading",
    title: "Reading",
    copy: "Currently juggling three books and finishing none. It's a system.",
    size: "small",
    gridClass: "col-span-6 md:col-span-3 min-h-[140px]",
  },
  {
    id: "coffee",
    title: "Coffee",
    copy: "The ritual matters more than the caffeine. Pour-over evangelist.",
    size: "small",
    gridClass: "col-span-6 md:col-span-3 min-h-[140px]",
  },
  {
    id: "film",
    title: "Film",
    copy: "Wes Anderson counts as a personality trait at this point.",
    size: "large",
    gridClass: "col-span-12 md:col-span-6 min-h-[180px]",
  },
  {
    id: "hiking",
    title: "Hiking",
    copy: "Best ideas happen at mile three, when my legs stop cooperating.",
    size: "medium",
    gridClass: "col-span-12 md:col-span-6 min-h-[160px]",
  },
];
