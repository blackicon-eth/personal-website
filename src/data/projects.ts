export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  role: string;
  year: string;
  links?: ProjectLink[];
  image?: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    title: "Builders Garden",
    description:
      "Product studio where I design and ship end-to-end dApps. I build the front-end and back-end for blockchain applications, integrating wallets and smart contracts for international clients.",
    tags: ["Next.js", "TypeScript", "Web3", "Solidity"],
    role: "Fullstack Developer",
    year: "2024 — Today",
    links: [{ label: "Visit site", href: "https://builders.garden" }],
    gradient: "linear-gradient(160deg, #7cff67 0%, #16251a 45%, #09090b 100%)",
  },
  {
    title: "Trading Bot",
    description:
      "Pine Script developer and consultant. I created trading bots, indicators, and updated existing ones for clients on Fiverr and beyond, earning a 5-star average review.",
    tags: ["Pine Script", "TradingView", "Python"],
    role: "Developer & Consultant",
    year: "2021 — 2023",
    links: [{ label: "GitHub", href: "https://github.com/blackicon-eth" }],
    gradient: "linear-gradient(160deg, #EAB308 0%, #251c0a 45%, #09090b 100%)",
  },
  {
    title: "Custom CRM",
    description:
      "First iteration of a CRM for a leading Italian insurance and mortgages intermediary. Delivered strong customer feedback and recognition from the client's technical team.",
    tags: ["React", "Node.js", "SQL"],
    role: "Software Engineer",
    year: "2023 — 2024",
    links: [{ label: "GitHub", href: "https://github.com/blackicon-eth" }],
    gradient: "linear-gradient(160deg, #5227FF 0%, #1c1330 45%, #09090b 100%)",
  },
  {
    title: "Smart Contracts",
    description:
      "Smart contract development across the EVM ecosystem using Solidity, Hardhat, and Brownie. Familiar with multiple ERC standards and wallet integration.",
    tags: ["Solidity", "Hardhat", "EVM", "ERC"],
    role: "Solidity Developer",
    year: "2023 — Today",
    links: [{ label: "GitHub", href: "https://github.com/blackicon-eth" }],
    gradient: "linear-gradient(160deg, #0891b2 0%, #0e1f29 45%, #09090b 100%)",
  },
];
