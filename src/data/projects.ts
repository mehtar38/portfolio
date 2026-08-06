export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  demoUrl: string;
  visualType: "image" | "video" | "screenshot";
  /** Supporting sidebar content for asymmetric layout */
  meta: {
    role: string;
    timeline: string;
    stack: string;
  };
}

export const projects: Project[] = [
  {
    id: "project-alpha",
    title: "StackTrace",
    description:
      "I am not the biggest fan of Leetcode in technical interviews, and I also noticed a lack of learning material for naviagting through production code. So I built StackTrace. It's a technical assessment platform the puts the developer in an environment to debug through broken open source prodcution code. Realistically, no one can understand a codebase in an hour, and so, I added an AI assistant that guides without giving the answers.",
    tags: ["React", "TypeScript", "AWS", "PostgreSQL", "Go", "Docker"],
    githubUrl: "https://github.com/mehtar38/StackTrace",
    demoUrl: "https://example.com",
    visualType: "screenshot",
    meta: {
      role: "Lead Developer",
      timeline: " April 2026 - July 2026",
      stack: "Challenges are a Docker container for each user, AWS (Aurora Postgres, ECS), React, TypeScript",
    },
  },
  {
    id: "project-beta",
    title: "Scout",
    description:
      "I use this one sometimes! It is a CLI tool that allows you to navigate through your file system in natural langauge. Since it is written in Go, there is search concurrency and real convenient OS coordination for opening/reading files. There is also a TUI for easier navigation. Another one of those times I appreciate Gemini API's free tier!",
    tags: ["Go", "Gemini API", "Claude", "Charm", "Lipgloss"],
    githubUrl: "https://github.com/mehtar38/scout",
    demoUrl: "https://example.com",
    visualType: "video",
    meta: {
      role: "Full-Stack Engineer",
      timeline: "2023 — 2024",
      stack: "Handled 10k+ concurrent data points with sub-second render times.",
    },
  },
  {
    id: "project-gamma",
    title: "Terms and Conditions Explained",
    description:"I've always been paranoid about accepting terms but I never wanted to read them either. So this is a browser extension that detects such terms, pops up, gives you a summary, trust score and an option to chat further on the chat interface about specific questions in the document. So you can ask, 'is my data safe here?' We built a RAG pipeline with ChromaDB for this, but also realised that wasn't very necessary to add. Learned where to use RAG correctly then.",
    tags: ["React", "Azure", "RAG", "OpenAI", "Gemini", "Node", "Express"],
    githubUrl: "https://github.com/mehtar38/termsnconditions",
    demoUrl: "https://example.com",
    visualType: "image",
    meta: {
      role: "Frontend Developer",
      timeline: "2023",
      stack: "Achieved WCAG 2.1 AA compliance across all core user flows.",
    },
  },
    {
    id: "project-delta",
    title: "CryptAI",
    description:"My Masters Capstone Project, sponsored by San Van High Technologies. I explored so much of the trading world through this. The biggest achievement out of this: we saw some profit for a while on Alpaca (Paper Trading) through our strategy. The essential difference between a human and AI trading agent was that humans relied on sentiment and intuition in addition to the analysed data, so we armed our trading strategy with market sentiment and human conversations to better inform its decision!",
    tags: ["React", "Azure", "RAG", "OpenAI", "Gemini", "Node", "Express"],
    githubUrl: "https://github.com/mehtar38/CryptoStar",
    demoUrl: "https://example.com",
    visualType: "image",
    meta: {
      role: "Frontend Developer",
      timeline: "2023",
      stack: "Achieved WCAG 2.1 AA compliance across all core user flows.",
    },
  },
      {
    id: "project-charlie",
    title: "ReCon",
    description:"My Bachelors Capstone Project. This was just when ChatGPT was starting to gain traction. The summarization methods then did not summarize research papers well because results included a bunch of diagrams and tables, not just texts. So we comparatively studied and implemented Transformers with attention layer and the other state of the art summarization methods at the time... and published the study as a research paper as well!",
    tags: ["NLP", "Seq2seq", "RAG", "OpenAI", "Gemini", "Node", "Express"],
    githubUrl: "https://github.com/mehtar38/CryptoStar",
    demoUrl: "https://example.com",
    visualType: "image",
    meta: {
      role: "Frontend Developer",
      timeline: "2023",
      stack: "Achieved WCAG 2.1 AA compliance across all core user flows.",
    },
  },
];
