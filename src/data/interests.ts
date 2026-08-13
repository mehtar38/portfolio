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
 copy:"730+ day streak that's opened my world a little more!",
 size:"medium",
 icon: SiDuolingo,

  },
  {
    id: "guitar",
    title: "Guitar",
    copy: "A proud average Guitar player for 7 years and counting",
    size: "small",
    gridClass: "col-span-6 md:col-span-4 min-h-[140px]",
  },
  {
    id: "physics",
    title: "Physics",
    copy: "I love talking Space and Universe. I see random videos and documentaries about all of these different theories at times. The fact that I had to see them again and again to understand... let's just say there's a reason I'm not a scientist. ",
    size: "medium",
    gridClass: "col-span-12 md:col-span-6 min-h-[160px]",
  },
  {
    id: "film",
    title: "Film",
    copy: "A language and a personality trait.",
    size: "large",
    gridClass: "col-span-12 md:col-span-6 min-h-[180px]",
  },
  {
    id: "travel",
    title: "Travel",
    copy: "And I think to myself, what a wonderful world.",
    size: "medium",
    gridClass: "col-span-12 md:col-span-6 min-h-[160px]",
  },
];
