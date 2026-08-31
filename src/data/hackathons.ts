export interface Hackathon {
  event: string;
  year: string;
  logo?: string;
  background?: string;
  project?: string;
  placement?: string;
  description?: string;
  prizes?: string[];
  links?: { label: string; url: string }[];
}

export const hackathons: Hackathon[] = [
  {
    event: "ETHGlobal Cannes",
    year: "2026",
    logo: "/hackathons/logos/ethglobal-cannes.png",
  },
  {
    event: "ETHGlobal Buenos Aires",
    year: "2025",
    logo: "/hackathons/logos/ethglobal-buenos-aires.png",
  },
  {
    event: "ETHGlobal Prague",
    year: "2025",
    logo: "/hackathons/logos/ethglobal-prague.png",
  },
  {
    event: "ETHGlobal Cannes",
    year: "2025",
    logo: "/hackathons/logos/ethglobal-cannes.png",
  },
  {
    event: "ETHDenver",
    year: "2025",
    logo: "/hackathons/logos/ethdenver.png",
    background: "#ffffff",
  },
  {
    event: "ETHBucharest",
    year: "2025",
    logo: "/hackathons/logos/ethbucharest-2025.png",
    background: "#ffffff",
  },
  {
    event: "ETHGlobal Bangkok",
    year: "2024",
    logo: "/hackathons/logos/ethglobal-bangkok.png",
  },
  {
    event: "ETHRome",
    year: "2024",
    logo: "/hackathons/logos/ethrome.png",
  },
  {
    event: "ETHWarsaw",
    year: "2024",
    logo: "/hackathons/logos/ethwarsaw.jpg",
    background: "#ffffff",
  },
  {
    event: "ETHGlobal Brussels",
    year: "2024",
    logo: "/hackathons/logos/ethglobal-brussels.png",
  },
  {
    event: "ETHPrague",
    year: "2024",
    logo: "/hackathons/logos/ethprague.jpeg",
  },
  {
    event: "ETHBucharest",
    year: "2024",
    logo: "/hackathons/logos/ethbucharest-2024.png",
    background: "#ffffff",
  },
  {
    event: "ETHRome",
    year: "2023",
    logo: "/hackathons/logos/ethrome.png",
  },
];
