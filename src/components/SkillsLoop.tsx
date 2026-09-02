import { createPortal } from "react-dom";
import { useCallback, useEffect, useMemo, useRef, useState, type Key } from "react";
import type { IconType } from "react-icons";
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
import { useI18n } from "@/i18n/LocaleProvider";
import type { Dictionary } from "@/i18n/dictionaries";

type SkillKey = keyof Dictionary["skills"]["items"];

const skills: { Icon: IconType; title: SkillKey }[] = [
  { Icon: SiTypescript, title: "TypeScript" },
  { Icon: SiJavascript, title: "JavaScript" },
  { Icon: SiPython, title: "Python" },
  { Icon: SiOpenjdk, title: "Java" },
  { Icon: SiScala, title: "Scala" },
  { Icon: SiC, title: "C" },
  { Icon: SiSolidity, title: "Solidity" },
  { Icon: SiTradingview, title: "Pine Script" },
  { Icon: SiHtml5, title: "HTML" },
  { Icon: SiCss, title: "CSS" },
  { Icon: SiReact, title: "React" },
  { Icon: SiNextdotjs, title: "Next.js" },
  { Icon: SiNodedotjs, title: "Node.js" },
  { Icon: SiTailwindcss, title: "Tailwind CSS" },
  { Icon: SiVite, title: "Vite" },
  { Icon: SiGraphql, title: "GraphQL" },
  { Icon: SiDrizzle, title: "Drizzle ORM" },
  { Icon: SiEthereum, title: "EVM" },
  { Icon: SiEthers, title: "ethers.js" },
  { Icon: SiWagmi, title: "Wagmi" },
  { Icon: SiPostgresql, title: "PostgreSQL" },
  { Icon: SiRedis, title: "Redis" },
  { Icon: SiIpfs, title: "IPFS" },
  { Icon: SiDocker, title: "Docker" },
  { Icon: SiLinux, title: "Linux" },
  { Icon: SiVercel, title: "Vercel" },
  { Icon: SiGit, title: "Git" },
  { Icon: SiGnubash, title: "Bash" },
  { Icon: SiGooglegemini, title: "AI coding" },
];

interface SkillsLoopProps {
  gap?: number;
  itemSize?: number;
  clickToOpen?: boolean;
  portalPopover?: boolean;
}

export function SkillsLoop({ gap = 64, itemSize = 64, clickToOpen = false, portalPopover = false }: SkillsLoopProps) {
  const { t } = useI18n();
  const [openItem, setOpenItem] = useState<{ key: string; title: string; description: string; anchor: HTMLDivElement; rect: DOMRect } | null>(null);
  const loopRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const hoverCloseRef = useRef<number | null>(null);

  useEffect(() => {
    if (!clickToOpen || !openItem) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!loopRef.current?.contains(event.target as Node)) {
        setOpenItem(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [clickToOpen, openItem]);

  useEffect(() => {
    if (!clickToOpen || !openItem) return;

    let frame = 0;
    const updatePosition = () => {
      const popover = popoverRef.current;
      if (popover) {
        const rect = openItem.anchor.getBoundingClientRect();
        popover.style.left = `${rect.left + rect.width / 2}px`;
        popover.style.top = `${rect.top - 20}px`;
      }
      frame = window.requestAnimationFrame(updatePosition);
    };

    updatePosition();
    return () => window.cancelAnimationFrame(frame);
  }, [clickToOpen, openItem?.key]);

  const logos = useMemo<LogoItem[]>(
    () =>
      skills.map(({ Icon, title }) => ({
        node: <Icon />,
        title,
        description: t.skills.items[title],
      })),
    [t],
  );

  const renderItem = useCallback(
    (item: LogoItem, key: Key) => {
      const isNode = "node" in item;
      const title = isNode ? item.title : item.alt;
      const description = isNode ? item.description : undefined;
      const itemKey = String(key);

      return (
        <div
          key={key}
          className={`group/skill relative flex flex-col items-center gap-2.5 ${clickToOpen ? "cursor-pointer" : ""}`}
          onMouseEnter={portalPopover && !clickToOpen && description ? (event) => {
            if (hoverCloseRef.current !== null) {
              window.clearTimeout(hoverCloseRef.current);
              hoverCloseRef.current = null;
            }
            const rect = event.currentTarget.getBoundingClientRect();
            setOpenItem({ key: itemKey, title: String(title), description, anchor: event.currentTarget, rect });
          } : undefined}
          onMouseLeave={portalPopover && !clickToOpen ? () => {
            hoverCloseRef.current = window.setTimeout(() => {
              setOpenItem(null);
              hoverCloseRef.current = null;
            }, 120);
          } : undefined}
          onClick={clickToOpen && description ? (event) => {
            const anchor = event.currentTarget;
            const rect = anchor.getBoundingClientRect();
            setOpenItem((current) => current?.key === itemKey ? null : {
              key: itemKey,
              title: String(title),
              description,
              anchor,
              rect,
            });
          } : undefined}
          onKeyDown={clickToOpen ? (event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              const anchor = event.currentTarget;
              const rect = anchor.getBoundingClientRect();
              setOpenItem((current) => current?.key === itemKey ? null : description ? {
                key: itemKey,
                title: String(title),
                description,
                anchor,
                rect,
              } : null);
            }
          } : undefined}
          role={clickToOpen ? "button" : undefined}
          tabIndex={clickToOpen ? 0 : undefined}
        >
          <span className="text-zinc-400 transition-colors duration-300 group-hover/skill:text-white">
            {isNode ? item.node : null}
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 transition-colors duration-300 group-hover/skill:text-zinc-300">
            {title}
          </span>
          {description && !clickToOpen && !portalPopover ? (
            <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-5 w-max max-w-[320px] -translate-x-1/2 translate-y-1 scale-95 opacity-0 transition-all duration-200 ease-out group-hover/skill:translate-y-0 group-hover/skill:scale-100 group-hover/skill:opacity-100">
              <div className="relative rounded-xl border border-white/10 bg-zinc-900/90 px-4 py-3.5 shadow-xl shadow-black/50 backdrop-blur-xl">
                <p className="text-[17px] font-semibold text-white">{t.skills.whereLearned}</p>
                <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-400">{description}</p>
                <div className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10 bg-zinc-900/90" />
              </div>
            </div>
          ) : null}
        </div>
      );
    },
    [clickToOpen, portalPopover, t],
  );

  return (
    <div ref={loopRef}>
      <LogoLoop
        logos={logos}
        speed={80}
        direction="left"
        logoHeight={itemSize}
        gap={gap}
        hoverSpeed={0}
        fadeOut
        fadeOutColor="#09090b"
        renderItem={renderItem}
        ariaLabel="Skills"
      />
      {portalPopover && openItem && typeof document !== "undefined" && createPortal(
        <div
          ref={popoverRef}
          className="pointer-events-none fixed z-100 w-max max-w-[min(320px,calc(100vw-2rem))] -translate-x-1/2 -translate-y-full rounded-xl border border-white/10 bg-zinc-900/95 px-4 py-3.5 shadow-xl shadow-black/50 backdrop-blur-xl"
          style={{ left: openItem.rect.left + openItem.rect.width / 2, top: openItem.rect.top - 20 }}
        >
          <p className="text-[17px] font-semibold text-white">{t.skills.whereLearned}</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-zinc-400">{openItem.description}</p>
          <div className="absolute left-1/2 top-full h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 border-b border-r border-white/10 bg-zinc-900/95" />
        </div>,
        document.body,
      )}
    </div>
  );
}
