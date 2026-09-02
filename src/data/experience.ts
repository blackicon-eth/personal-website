import type { Dictionary } from "@/i18n/dictionaries";

export type ExperienceId = keyof Dictionary["experience"]["items"];

export interface Experience {
  id: ExperienceId;
  company: string;
  image?: string;
  background: string;
}

export const experience: Experience[] = [
  {
    id: "builders-garden",
    company: "Builders Garden",
    image: "/experience/bg.png",
    background: "#000000",
  },
  {
    id: "start-and-go",
    company: "Start&Go Innovative Solutions",
    image: "/experience/startego.png",
    background: "#FFFFFF",
  },
  {
    id: "freelancer",
    company: "Freelancer",
    image: "/experience/fiverr.png",
    background: "#d3f6e5",
  },
];
