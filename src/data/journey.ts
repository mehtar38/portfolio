import nmims from "../assets/nmims.png";
import breatheit from "../assets/breathe.png";
import uci from "../assets/uci.png";
import bnp from "../assets/bnp.png";
import ieee from"../assets/ieee.webp";
import brss from "../assets/brss.jpg";

export interface JourneyArtifact {
  label: string;
  href: string;
}

export interface JourneyMilestone {
  id: string;
  year: string;
  category: string;
  title: string;
  subtitle: string;
  description?: string;
  logo?: string;
  highlights?: string[];
  artifacts?: JourneyArtifact[];
  align: "left" | "right";
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "education-2020",
    year: "2020 - 2024",
    category: "Undergraduate",
    title: "Bachelors of Technology in Computer Engineering",
    subtitle: "Mukesh Patel School of Technology Management & Engineering, NMIMS University",
    logo: nmims,
    description:
      "CGPA: 3.87/4.00",
    align: "left",
      artifacts: [
    {
      label: "Marksheet",
      href: "https://drive.google.com/file/d/1tPSmedH5jFt2Ojbeq-qCvY6Nh7RFGy1_/view?usp=sharing",
    },
  ],
  },
    {
    id: "graduate-2025",
    year: "2024 - 2025",
    category: "Graduate",
    title: "Masters in Computer Science",
    subtitle: "University of California, Irvine",
    logo: uci, 
    description:
      "CGPA: 4.00/4.00",
    align: "left",
    artifacts: [
    {
      label: "Transcripts",
      href: "https://drive.google.com/file/d/1XCHHDvpVQQN4FNif2WgO0NAS0jgRXPB3/view?usp=sharing",
    },
  ],
  },
  {
    id: "internship-2024",
    year: "2025",
    category: "Internship",
    title: "Software Engineering Intern",
    subtitle: "BreatheIt, Inc.",
    logo: breatheit,
    description:
      "Contributed to production features in a collaborative engineering team, gaining experience with code review, agile workflows, and full-stack development.",
    align: "right",
    artifacts: [
    {
      label: "iOS",
      href: "https://apps.apple.com/us/app/ultopia/id6742277064ing",
    },
  ],
  },
    {
    id: "internship-2024",
    year: "2025",
    category: "Internship",
    title: "Applied Machine Learning Intern",
    subtitle: "Boundary Remote Subsurface Solutions ",
    logo: brss,
    description:
      "Contributed to production features in a collaborative engineering team, gaining experience with code review, agile workflows, and full-stack development.",
    align: "right",
},
    {
    id: "internship",
    year: "2024",
    category: "Internship",
    title: "Full-Stack Development Intern",
    subtitle: "BNP Paribas",
    logo: bnp,
    description:
      "Completed intensive self-directed learning in modern web technologies — React, TypeScript, and cloud deployment — applied through personal and academic projects.",
    align: "right",
    artifacts: [
    {
      label: "Certificate",
      href: "https://drive.google.com/file/d/1Z7FGOmvlHAQGlF8oXWXP8G2Y2Rge7XHf/view?usp=sharing",
    },
  ],
  },
  {
    id: "research-paper",
    year: "2024",
    category: "Research",
    title: "Research Paper",
    subtitle: "Text Summarization for Research Papers",
    logo: ieee,
    description: "Published in the 2024 IEEE 9th International Conference for Convergence in Technology (I2CT)",
    align: "left",
    artifacts: [
    {
      label: "Publication",
      href: "https://ieeexplore.ieee.org/abstract/document/10543503",
    },
  ],
  },

];
