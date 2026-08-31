import type { Dictionary } from "@/i18n/dictionaries";

export type ExperienceId = keyof Dictionary["experience"]["items"];

export interface Experience {
  id: ExperienceId;
  company: string;
  image?: string;
  gradient: string;
}

export const experience: Experience[] = [
  {
    id: "builders-garden",
    company: "Builders Garden",
    image: "/experience/bg.png",
    gradient: "linear-gradient(160deg, #7cff67 0%, #16251a 45%, #09090b 100%)",
  },
  {
    id: "start-and-go",
    company: "Start&Go Innovative Solutions",
    image: "/experience/startego.png",
    gradient: "linear-gradient(160deg, #5227FF 0%, #1c1330 45%, #09090b 100%)",
  },
  {
    id: "freelancer",
    company: "Freelancer",
    image: "/experience/fiverr.png",
    gradient: "linear-gradient(160deg, #EAB308 0%, #251c0a 45%, #09090b 100%)",
  },
];
