import { useCallback, useMemo, type Key } from "react";
import {
  SiTypescript,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiWagmi,
  SiPython,
  SiOpenjdk,
  SiScala,
  SiC,
  SiPostgresql,
  SiDocker,
  SiLinux,
  SiGnubash,
  SiGit,
  SiVite,
  SiSolidity,
  SiEthereum,
  SiGraphql,
  SiRedis,
  SiVercel,
  SiTradingview,
  SiEthers,
  SiIpfs,
  SiGooglegemini,
  SiDrizzle,
} from "react-icons/si";
import { LogoLoop, type LogoItem } from "@/components/LogoLoop";

const skills = [
  { Icon: SiTypescript, title: "TypeScript", learned: "In hackathons and perfected while working in Builders Garden" },
  { Icon: SiJavascript, title: "JavaScript", learned: "In University, hackathons and perfected while working in Builders Garden" },
  { Icon: SiPython, title: "Python", learned: "In University and perfected while working in Start&Go" },
  { Icon: SiOpenjdk, title: "Java", learned: "In University" },
  { Icon: SiScala, title: "Scala", learned: "In University" },
  { Icon: SiC, title: "C", learned: "In University" },
  { Icon: SiSolidity, title: "Solidity", learned: "Self-taught for personal projects" },
  { Icon: SiTradingview, title: "Pine Script", learned: "Freelancing on Fiverr" },
  { Icon: SiHtml5, title: "HTML", learned: "In University, hackathons and perfected while working in Builders Garden" },
  { Icon: SiCss, title: "CSS", learned: "In University, hackathons and perfected while working in Builders Garden" },
  { Icon: SiReact, title: "React", learned: "In hackathons and perfected while working in Builders Garden" },
  { Icon: SiNextdotjs, title: "Next.js", learned: "In hackathons and perfected while working in Builders Garden" },
  { Icon: SiNodedotjs, title: "Node.js", learned: "In hackathons and perfected while working in Builders Garden and Start&Go" },
  { Icon: SiTailwindcss, title: "Tailwind CSS", learned: "In hackathons and perfected while working in Builders Garden" },
  { Icon: SiVite, title: "Vite", learned: "Self-taught for personal projects and perfected while working as a freelance" },
  { Icon: SiGraphql, title: "GraphQL", learned: "While working in Builders Garden" },
  { Icon: SiDrizzle, title: "Drizzle ORM", learned: "While working in Builders Garden" },
  { Icon: SiEthereum, title: "EVM", learned: "Self taught, during hackathons and perfected while working in Builders Garden" },
  { Icon: SiEthers, title: "ethers.js", learned: "During hackathons and perfected while working in Builders Garden" },
  { Icon: SiWagmi, title: "Wagmi", learned: "During hackathons and perfected while working in Builders Garden" },
  { Icon: SiPostgresql, title: "PostgreSQL", learned: "In University and perfected while working in Start&Go" },
  { Icon: SiRedis, title: "Redis", learned: "While working in Builders Garden and used in many personal projects" },
  { Icon: SiIpfs, title: "IPFS", learned: "During hackathons and perfected while working in Builders Garden" },
  { Icon: SiDocker, title: "Docker", learned: "While working in Start&Go and used in some personal projects" },
  { Icon: SiLinux, title: "Linux", learned: "In University and kept using it since then" },
  { Icon: SiVercel, title: "Vercel", learned: "While working in Builders Garden and used in many personal projects" },
  { Icon: SiGit, title: "Git", learned: "At Start&Go and kept using it since then" },
  { Icon: SiGnubash, title: "Bash", learned: "In University and kept using it since then" },
  { Icon: SiGooglegemini, title: "AI coding", learned: "In hackathons and perfected while working in Builders Garden" },
];

export function SkillsLoop() {
  const logos = useMemo<LogoItem[]>(
    () =>
      skills.map(({ Icon, title, learned }) => ({
        node: <Icon />,
        title,
        description: learned,
      })),
    [],
  );

  const renderItem = useCallback((item: LogoItem, key: Key) => {
    const isNode = "node" in item;
    const title = isNode ? item.title : item.alt;
    const description = isNode ? item.description : undefined;

    return (
      <div
        key={key}
        className="group/skill relative flex flex-col items-center gap-2.5"
      >
        <span className="text-zinc-400 transition-colors duration-300 group-hover/skill:text-white">
          {isNode ? item.node : null}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-hover/skill:text-zinc-300">
          {title}
        </span>
        {description ? (
          <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-5 w-max max-w-[320px] -translate-x-1/2 translate-y-1 scale-95 opacity-0 transition-all duration-200 ease-out group-hover/skill:translate-y-0 group-hover/skill:scale-100 group-hover/skill:opacity-100">
            <div className="relative rounded-xl border border-white/10 bg-zinc-900/90 px-4 py-3.5 shadow-xl shadow-black/50 backdrop-blur-xl">
              <p className="text-[17px] font-semibold text-white">
                Where did I learn this?
              </p>
              <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-400">
                {description}
              </p>
              <div className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10 bg-zinc-900/90" />
            </div>
          </div>
        ) : null}
      </div>
    );
  }, []);

  return (
    <LogoLoop
      logos={logos}
      speed={55}
      direction="left"
      logoHeight={64}
      gap={64}
      hoverSpeed={0}
      fadeOut
      fadeOutColor="#09090b"
      renderItem={renderItem}
      ariaLabel="Skills"
    />
  );
}
