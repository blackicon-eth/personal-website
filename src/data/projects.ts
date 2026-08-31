import type { Dictionary } from "@/i18n/dictionaries";

export type ProjectId = keyof Dictionary["projects"]["items"];

export interface ProjectLink {
  label: string;
  labelKey?: keyof Dictionary["projects"]["links"];
  href: string;
}

export interface Project {
  id: ProjectId;
  title: string;
  tags: string[];
  links?: ProjectLink[];
  image?: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: "itm-id",
    title: "ITM ID",
    tags: ["Next.js", "TypeScript", "Tailwind", "Farcaster", "GraphQL"],
    links: [
      {
        label: "Launch app",
        labelKey: "launchApp",
        href: "https://farcaster.xyz/?launchFrameUrl=https%3A%2F%2Fitm-id-miniapp.vercel.app",
      },
      { label: "Builders Garden", href: "https://builders.garden/projects/itm" },
      { label: "ITM Studio", href: "https://itm.studio/" },
    ],
    image: "/projects/itm.png",
    gradient: "linear-gradient(160deg, #8b5cf6 0%, #1c1330 45%, #09090b 100%)",
  },
  {
    id: "brewlog",
    title: "Brewlog",
    tags: ["React Native", "Expo", "TypeScript", "SQLite", "QVAC"],
    links: [
      { label: "GitHub", href: "https://github.com/blackicon-eth/brewlog" },
      { label: "Tether QVAC", href: "https://qvac.tether.io/" },
    ],
    image: "/projects/brewlog.png",
    gradient: "linear-gradient(160deg, #c28a5b 0%, #221a12 45%, #09090b 100%)",
  },
  {
    id: "glider",
    title: "Glider Mini App",
    tags: ["Next.js", "TypeScript", "Tailwind", "tRPC", "Wagmi", "Farcaster", "Worldcoin", "Base App"],
    links: [
      {
        label: "Launch app",
        labelKey: "launchApp",
        href: "https://farcaster.xyz/?launchFrameUrl=https%3A%2F%2Fminiapp.glider.fi",
      },
      { label: "Glider", href: "https://glider.fi" },
    ],
    image: "/projects/glider.png",
    gradient: "linear-gradient(160deg, #10b981 0%, #0f1f18 45%, #09090b 100%)",
  },
  {
    id: "savelli",
    title: "Residenza Savelli",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Motion", "i18n"],
    links: [{ label: "Visit site", labelKey: "visitSite", href: "https://bnbsavelli.vercel.app/it" }],
    image: "/projects/savelli.png",
    gradient: "linear-gradient(160deg, #c9a87c 0%, #221b13 45%, #09090b 100%)",
  },
];
