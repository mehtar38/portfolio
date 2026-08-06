import {
  FaJava,
  FaPython,
  FaReact,
  FaDatabase,
  FaAws,
} from "react-icons/fa";
import {
  // siAmazonaws,
  SiDocker,
  SiKubernetes,
  SiNodedotjs,
  SiRedis,
  SiSpringboot,
  SiTensorflow,
  SiTerraform,
} from "react-icons/si";
import type { IconType } from "react-icons";

export type SkillDifficulty = "easy" | "medium" | "hard";

export interface Skill {
  id: string;
  name: string;
  icon: IconType;
  difficulty: SkillDifficulty;
  /** How long the skill stays visible (ms) */
  duration: number;
}

/** Game skills — add new entries with name, icon, difficulty, duration */
export const skills: Skill[] = [
  { id: "react", name: "React", icon: FaReact, difficulty: "easy", duration: 2500 },
  { id: "java", name: "Java", icon: FaJava, difficulty: "easy", duration: 2500 },
  { id: "python", name: "Python", icon: FaPython, difficulty: "easy", duration: 2500 },
  { id: "sql", name: "SQL", icon: FaDatabase, difficulty: "easy", duration: 2500 },
  { id: "spring-boot", name: "Spring Boot", icon: SiSpringboot, difficulty: "easy", duration: 2500},
  { id: "docker", name: "Docker", icon: SiDocker, difficulty: "medium", duration: 1500},
  { id: "aws", name: "AWS", icon: FaAws, difficulty: "medium", duration: 1500 },
  {
    id: "nodejs",
    name: "Node.js",
    icon: SiNodedotjs,
    difficulty: "medium",
    duration: 1500,
  },
  {
    id: "redis",
    name: "Redis",
    icon: SiRedis,
    difficulty: "medium",
    duration: 1500,
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    icon: SiKubernetes,
    difficulty: "hard",
    duration: 800,
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    icon: SiTensorflow,
    difficulty: "hard",
    duration: 800,
  },
  {
    id: "terraform",
    name: "Terraform",
    icon: SiTerraform,
    difficulty: "hard",
    duration: 800,
  },
];
