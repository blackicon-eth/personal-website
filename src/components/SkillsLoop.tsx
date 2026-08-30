import { useCallback, useMemo, type Key } from "react";
import {
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiSolidity,
  SiPython,
  SiVite,
  SiDocker,
} from "react-icons/si";
import { LogoLoop, type LogoItem } from "@/components/LogoLoop";

const skills = [
  { Icon: SiTypescript, title: "TypeScript" },
  { Icon: SiReact, title: "React" },
  { Icon: SiNextdotjs, title: "Next.js" },
  { Icon: SiNodedotjs, title: "Node.js" },
  { Icon: SiTailwindcss, title: "Tailwind CSS" },
  { Icon: SiPostgresql, title: "PostgreSQL" },
  { Icon: SiSolidity, title: "Solidity" },
  { Icon: SiPython, title: "Python" },
  { Icon: SiVite, title: "Vite" },
  { Icon: SiDocker, title: "Docker" },
];

export function SkillsLoop() {
  const logos = useMemo<LogoItem[]>(
    () =>
      skills.map(({ Icon, title }) => ({
        node: <Icon />,
        title,
      })),
    [],
  );

  const renderItem = useCallback(
    (item: LogoItem, key: Key) => (
      <div
        key={key}
        className="flex flex-col items-center gap-2.5"
      >
        <span className="text-zinc-400 transition-colors duration-300 hover:text-white">
          {"node" in item ? item.node : null}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          {"node" in item ? item.title : item.alt}
        </span>
      </div>
    ),
    [],
  );

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
