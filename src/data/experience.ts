export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  image?: string;
  gradient: string;
}

export const experience: Experience[] = [
  {
    company: "Builders Garden",
    role: "Fullstack Developer",
    period: "May 2024 — Today",
    description:
      "Fullstack developer in [Builders Garden](https://builders.garden), the company I co-founded. I managed and developed front-end and back-end for dApps using Next.js, TypeScript, and Web3 technologies, with a focus on wallets and smart contracts integration. I developed custom solutions for international clients operating in the blockchain space.",
    image: "/experience/bg.png",
    gradient: "linear-gradient(160deg, #7cff67 0%, #16251a 45%, #09090b 100%)",
  },
  {
    company: "Start&Go Innovative Solutions",
    role: "Junior Software Engineer",
    period: "Dec. 2023 — May 2024",
    description:
      "Developed the first iteration of a custom CRM for an important Italian insurance and mortgages intermediary at [Start&Go](https://www.startegois.com/en), earning excellent customer feedback and recognition from the client's technical team. The experience ended, at my request, to pursue a career focused on blockchain software development.",
    image: "/experience/startego.png",
    gradient: "linear-gradient(160deg, #5227FF 0%, #1c1330 45%, #09090b 100%)",
  },
  {
    company: "Freelancer",
    role: "Trading Bot Developer & Consultant",
    period: "Oct. 2021 — Jan. 2023",
    description:
      "Worked as a Pine Script developer and consultant, finding clients myself and on [Fiverr](https://www.fiverr.com/algorithm_matt), with a 5-star average review. Created trading bots, indicators, and updated existing ones, learning to manage international clients, update software written by others, and work under strict deadlines.",
    image: "/experience/fiverr.png",
    gradient: "linear-gradient(160deg, #EAB308 0%, #251c0a 45%, #09090b 100%)",
  },
];
