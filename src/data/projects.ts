import stacktrace from "../assets/stacktrace.jpeg";
import scout from "../assets/scout.png";
import cryptai from "../assets/cryptAI.png";
import recon from "../assets/recon.png";
import tnc from "../assets/tncs.png";

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  visualType: "image" | "video" | "screenshot";
  image?: string;
  meta: {
    // role: string;
    timeline: string;
    stack: string[];
  };
}

export const projects: Project[] = [
  {
    id: "project-alpha",
    title: "StackTrace",
    description:
      "I am not the biggest fan of Leetcode in technical interviews, and I also noticed a lack of learning material for naviagting through production code. So I built StackTrace. It's a technical assessment platform the puts the developer in an environment to debug through broken open source prodcution code. Realistically, no one can understand a codebase in an hour, and so, I added an AI assistant that guides without giving the answers.",
    tags: ["Next.js", "TypeScript", "AWS", "Aurora", "Go", "Docker"],
    githubUrl: "https://github.com/mehtar38/StackTrace",
    // demoUrl: "https://example.com",
    visualType: "image",
    image: stacktrace,
    meta: {
      // role: "Lead Developer",
      timeline: " April 2026 - July 2026",
      stack: ["Every challenge is real open source production code that I broke.", 
         "Every challenge is it's own Docker container for each user.", 
         "The container is pre-warmed before loading files to save visible load time for users.",
         "AWS configuration and decision is a real task. So much of it broke(my own fault), and I learnt SO much fixing it."]
    },
  },
  {
    id: "project-beta",
    title: "Scout",
    description:
      "I use this one sometimes! It is a CLI tool that allows you to navigate through your file system in natural langauge. Since it is written in Go, there is search concurrency and real convenient OS coordination for opening/reading files. There is also a TUI for easier navigation. Another one of those times I appreciate Gemini API's free tier!",
    tags: ["Go", "Gemini API", "Claude", "Charm", "Lipgloss", "Cobra"],
    githubUrl: "https://github.com/mehtar38/scout",
    demoUrl: "https://drive.google.com/file/d/1iyFSVz7E-MchnH4vi3a_ZneUkAfEWjMg/view?usp=sharing",
    visualType: "image",
    image: scout,
    meta: {
      // role: "Full-Stack Engineer",
      timeline: "Jan 2026 - Mar 2026",
      stack: ["I developed some genuine respect for Go's concurrency.",
        "Implemented both sequential and concurrent search just to see the difference.",
        "Gemini's AI layer is for translation, it builds out a json from user prompt which implements the already exsiting commands.",
        "Cobra's structure for CLI commmands is super intuitive.  "]
    },
  },
  {
    id: "project-gamma",
    title: "Terms and Conditions Explained",
    description:"I've always been paranoid about accepting terms but I never wanted to read them either. So this is a browser extension that detects such terms, pops up, gives you a summary, trust score and an option to chat further on the chat interface about specific questions in the document. So you can ask, 'is my data safe here?' We built a RAG pipeline with ChromaDB for this, but also realised that wasn't very necessary to add. Learned where to use RAG correctly then.",
    tags: ["React", "Azure", "RAG", "OpenAI", "Node", "ChromaDB", "ManifestV3"],
    githubUrl: "https://github.com/mehtar38/termsnconditions",
    demoUrl: "https://drive.google.com/file/d/1Qi2AV8YjLN_EYZg0mmKi56Fh9_GLjqSO/view?usp=sharing",
    visualType: "image",
    image: tnc,
    meta: {
      // role: "Frontend Developer",
      timeline: "Nov 2025 - Jan 2026",
      stack: ["Extension detects when you open a T&C page and sends the doc to the backend automatically.",
        "Learned by doing: RAG isn't well used for independent documents, but for large enough ones, it can be great to create citations.",
        "Browser extensions feel like magic the first time they work."],
    },
  },
    {
    id: "project-delta",
    title: "CryptAI",
    description:"My Masters Capstone Project, sponsored by San Van High Technologies. I explored so much of the trading world through this. The biggest achievement out of this: we saw some profit for a while on Alpaca (Paper Trading) through our strategy. The essential difference between a human and AI trading agent was that humans relied on sentiment and intuition in addition to the analysed data, so we armed our trading strategy with market sentiment and human conversations to better inform its decision!",
    tags: ["Python FastAPI", "Websocket", "REST", "Alpaca", "Redis", "Postgres", "Redis"],
    githubUrl: "https://github.com/mehtar38/CryptoStar",
    demoUrl: "https://drive.google.com/file/d/14IcMNtkGmlIwjCKCpo2uXyGkMt4fSz8q/view?usp=sharing",
    visualType: "image",
    image: cryptai, 
    meta: {
      // role: "Frontend Developer",
      timeline: "Jan 2025 - May 2025",
      stack: ["Our strategy takes input from Reddit/Twitter conversations, current news and market sentiment to decide the trade specifications.",
        "Learned that no amount of risk optimization is enough for this trading world.",
        "Shout out to Alpaca, such a friend for testing strategies via paper trading."],
    },
  },
      {
    id: "project-charlie",
    title: "ReCon",
    description:"My Bachelors Capstone Project. This was just when ChatGPT was starting to gain traction. The summarization methods then did not summarize research papers well because results included a bunch of diagrams and tables, not just texts. So we comparatively studied and implemented Transformers with attention layer and the other state of the art summarization methods at the time... and published the study as a research paper as well!",
    tags: ["NLP", "Seq2seq", "RAG", "OpenAI", "Gemini", "Python", "TensorFlow"],
    // githubUrl: "https://github.com/mehtar38/CryptoStar",
    // demoUrl: "https://example.com",
    visualType: "image",
    image: recon,
    meta: {
      // role: "Frontend Developer",
      timeline: "Jul 2023 - Jan 2024",
      stack: ["Learned the internal architecture of LLMs before using them, which made later projects make way more sense.",
        "We implemented T5, BERT, LSA, Term frequency, Seq2Seq endoder decoder (with and without attention) + transformers",
        "'All you need is attention' is so grounbreaking, technicall changed my perspective on the 'if LLMs are intelligent' debate.",
        "We presented this at a conference!!"],
    },
  },
];
