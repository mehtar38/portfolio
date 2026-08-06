import img1 from "../assets/img-3.jpeg";
import img2 from "../assets/img-2.jpeg";
import img3 from "../assets/img-1.jpeg";
import img4 from "../assets/img-1.jpeg";

export interface VolunteerImageItem {
  id: string;
  type: "image";
  title: string;
  year: string;
  role: string;
  description: string;
  gridClass: string;
  image: string;
}

export interface VolunteerTextItem {
  id: string;
  type: "text" | "achievement" | "leadership" | "stat";
  title: string;
  subtitle?: string;
  description: string;
  stat?: string;
  gridClass: string;
}

export type VolunteerItem = VolunteerImageItem | VolunteerTextItem;

export const volunteerItems: VolunteerItem[] = [
  {
    id: "img-1",
    type: "image",
    title: "Community Tech Workshop",
    year: "2024",
    role: "Lead Organizer",
    description: "Taught coding fundamentals to underserved youth in the local community.",
    gridClass: "col-span-12 md:col-span-7 row-span-2 min-h-[280px]",
    image: img1,
  },
  {
    id: "stat-1",
    type: "stat",
    title: "Impact",
    stat: "120+",
    description: "Students reached through workshops and mentorship programs.",
    gridClass: "col-span-6 md:col-span-5 min-h-[140px]",
  },
  {
    id: "leadership-1",
    type: "leadership",
    title: "Women in Tech Chapter",
    subtitle: "President",
    description: "Led a university chapter focused on mentorship, networking, and career development.",
    gridClass: "col-span-6 md:col-span-5 min-h-[140px]",
  },
  {
    id: "img-2",
    type: "image",
    title: "Hackathon for Social Good",
    year: "2023",
    role: "Volunteer Mentor",
    description: "Guided teams building solutions for local nonprofit organizations.",
    gridClass: "col-span-12 md:col-span-5 min-h-[220px]",
    image: img2,
  },
  {
    id: "achievement-1",
    type: "achievement",
    title: "Outstanding Service Award",
    subtitle: "University Recognition",
    description: "Honored for sustained community engagement and leadership in tech outreach.",
    gridClass: "col-span-6 md:col-span-4 min-h-[180px]",
  },
  {
    id: "img-3",
    type: "image",
    title: "STEM Outreach Program",
    year: "2023",
    role: "Program Coordinator",
    description: "Coordinated weekly sessions introducing middle school students to programming.",
    gridClass: "col-span-6 md:col-span-8 min-h-[220px]",
    image: img3,
  },
  {
    id: "text-1",
    type: "text",
    title: "Open Source Contributor",
    subtitle: "Documentation & Outreach",
    description: "Contributed to open-source projects focused on developer tooling and educational resources.",
    gridClass: "col-span-12 md:col-span-4 min-h-[160px]",
  },
  {
    id: "img-4",
    type: "image",
    title: "Annual Charity Drive",
    year: "2022",
    role: "Volunteer",
    description: "Organized fundraising events supporting local education initiatives.",
    gridClass: "col-span-6 md:col-span-6 min-h-[200px]",
    image: img4,
  },
  {
    id: "stat-2",
    type: "stat",
    title: "Hours Volunteered",
    stat: "300+",
    description: "Dedicated to community service, mentorship, and nonprofit support.",
    gridClass: "col-span-6 md:col-span-6 min-h-[200px]",
  },
];
