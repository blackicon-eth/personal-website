export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  links?: ProjectLink[];
  image?: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    title: "ITM ID",
    description:
      "Farcaster mini app for ITM that lets users check their Echoes feed, browse past and upcoming Moments, and view their profile, plus a unique QR code for IRL event check-in.\n\nA mostly read-only client powered by GraphQL queries to the ITM backend, featuring OTP phone login, paginated feeds, and interactive Echoes.\n\nThe real challenge was replicating a native mobile experience in a browser: pull-to-refresh, buttery-smooth animations, and slide-in page transitions, making it feel like a native app rather than a web page.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Farcaster", "GraphQL"],
    links: [
      {
        label: "Launch app",
        href: "https://farcaster.xyz/?launchFrameUrl=https%3A%2F%2Fitm-id-miniapp.vercel.app",
      },
      { label: "Builders Garden", href: "https://builders.garden/projects/itm" },
      { label: "ITM Studio", href: "https://itm.studio/" },
    ],
    image: "/projects/itm.png",
    gradient: "linear-gradient(160deg, #8b5cf6 0%, #1c1330 45%, #09090b 100%)",
  },
  {
    title: "Brewlog",
    description:
      "On-device pour-over coffee journal with an offline AI assistant. Log coffees and brews in a warm paper ledger, from dose and ratio to grind, temperature, tasting notes, and per-method recipes.\n\nThe assistant (QVAC) runs fully on-device and reasons over your own data to chat about your brewing, autofill forms from plain English, diagnose a brew, and propose the best recipe per bean.\n\nNo cloud, no account, everything local.\nBuilt as a pure mobile app over SQLite, with deterministic offline tools like the Brew Ratio, 4:6 Method, and Coffee Compass.",
    tags: ["React Native", "Expo", "TypeScript", "SQLite", "QVAC"],
    links: [
      { label: "GitHub", href: "https://github.com/blackicon-eth/brewlog" },
      { label: "Tether QVAC", href: "https://qvac.tether.io/" },
    ],
    image: "/projects/brewlog.png",
    gradient: "linear-gradient(160deg, #c28a5b 0%, #221a12 45%, #09090b 100%)",
  },
  {
    title: "Glider Mini App",
    description:
      "The official Glider mini app, a Next.js client that runs inside Farcaster, Base App, and Worldcoin mini-app hosts. It converts Glider's automated onchain portfolio product into a mobile experience.\n\nIt brings the full Glider product to a small screen: browse automated onchain portfolios, trade, explore and manage assets, with sign-in that adapts to the host you opened it from.\n\nIt stays in sync with Glider in real time, keeping the experience lightweight and secure.",
    tags: ["Next.js", "TypeScript", "Tailwind", "tRPC", "Wagmi", "Farcaster", "Worldcoin", "Base App"],
    links: [
      {
        label: "Launch app",
        href: "https://farcaster.xyz/?launchFrameUrl=https%3A%2F%2Fminiapp.glider.fi",
      },
      { label: "Glider", href: "https://glider.fi" },
    ],
    image: "/projects/glider.png",
    gradient: "linear-gradient(160deg, #10b981 0%, #0f1f18 45%, #09090b 100%)",
  },
  {
    title: "Residenza Savelli",
    description:
      "Website for Residenza Savelli, a boutique bed and breakfast in Rome, steps from the Vatican and Villa Doria Pamphili. An editorial single-page site that walks guests through the residence, its rooms, services, and location.\n\nCrafted with scroll-reveal animations, smooth transitions and a warm printed-magazine feel, with booking handled directly through WhatsApp and email.\n\nFully multilingual, with SEO metadata, JSON-LD structured data, and a sitemap.",
    tags: ["Next.js", "TypeScript", "Tailwind", "shadcn/ui", "Motion", "i18n"],
    links: [{ label: "Visit site", href: "https://bnbsavelli.vercel.app/it" }],
    image: "/projects/savelli.png",
    gradient: "linear-gradient(160deg, #c9a87c 0%, #221b13 45%, #09090b 100%)",
  },
];
