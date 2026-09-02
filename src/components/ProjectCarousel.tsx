import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import type { PanInfo } from "motion/react";
import { projects } from "@/data/projects";
import { LocaleText } from "@/components/LocaleText";
import { ProjectMeta } from "@/components/ProjectMeta";
import { useI18n } from "@/i18n/LocaleProvider";

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const AUTOPLAY_DELAY = 5000;
const MANUAL_PAUSE_MS = 3 * 60 * 1000;

interface ProjectCarouselProps {
  mobileLayout?: boolean;
}

export function ProjectCarousel({ mobileLayout = false }: ProjectCarouselProps) {
  const { t } = useI18n();
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(1);
  const [paused, setPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);
  const x = useMotionValue(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const manualTimerRef = useRef<number | null>(null);

  const itemsForRender = useMemo(
    () => [projects[projects.length - 1], ...projects, projects[0]],
    [],
  );
  const trackItemOffset = width;
  const lastCloneIndex = itemsForRender.length - 1;

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const activeIndex =
    projects.length === 0 ? 0 : (position - 1 + projects.length) % projects.length;

  useEffect(() => {
    setDescriptionExpanded(false);
  }, [activeIndex]);

  useEffect(() => {
    if (paused || manualPaused || itemsForRender.length <= 1) return;
    const id = setInterval(() => {
      setPosition((p) => Math.min(p + 1, lastCloneIndex));
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [paused, manualPaused, itemsForRender.length, lastCloneIndex]);

  const startManualPause = useCallback(() => {
    if (manualTimerRef.current != null) {
      window.clearTimeout(manualTimerRef.current);
    }
    setManualPaused(true);
    manualTimerRef.current = window.setTimeout(() => {
      setManualPaused(false);
      manualTimerRef.current = null;
    }, MANUAL_PAUSE_MS);
  }, []);

  const cancelManualPause = useCallback(() => {
    if (manualTimerRef.current != null) {
      window.clearTimeout(manualTimerRef.current);
      manualTimerRef.current = null;
    }
    setManualPaused(false);
  }, []);

  useEffect(() => {
    window.addEventListener("site:navigate", cancelManualPause);
    return () => window.removeEventListener("site:navigate", cancelManualPause);
  }, [cancelManualPause]);

  useEffect(
    () => () => {
      if (manualTimerRef.current != null) {
        window.clearTimeout(manualTimerRef.current);
      }
    },
    [],
  );

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING;

  const handleAnimationComplete = () => {
    if (itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    if (position === lastCloneIndex) {
      setIsJumping(true);
      setPosition(1);
      x.set(-trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
    } else if (position === 0) {
      setIsJumping(true);
      setPosition(projects.length);
      x.set(-projects.length * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
    } else {
      setIsAnimating(false);
    }
  };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -60 || velocity.x < -500
        ? 1
        : offset.x > 60 || velocity.x > 500
          ? -1
          : 0;
    if (direction === 0) return;
    setPosition((prev) =>
      Math.max(0, Math.min(prev + direction, lastCloneIndex)),
    );
  };

  const next = () => {
    startManualPause();
    setPosition((p) => Math.min(p + 1, lastCloneIndex));
  };
  const prev = () => {
    startManualPause();
    setPosition((p) => Math.max(p - 1, 0));
  };
  const goTo = (i: number) => setPosition(i + 1);

  const project = projects[activeIndex];

  return (
    <div
      className={`flex flex-col ${mobileLayout ? "gap-1" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`flex w-full flex-col items-start ${mobileLayout ? "gap-8" : "gap-10 lg:flex-row lg:gap-20"}`}>
        <div className="flex w-full flex-col gap-8 lg:w-[55%] lg:shrink-0">
          <div className="relative w-full">
            <div
              ref={viewportRef}
              className={`relative aspect-square overflow-hidden rounded-2xl border border-white/10 ${mobileLayout ? "rounded-xl" : ""}`}
            >
              {width > 0 && (
                <motion.div
                  className="flex h-full cursor-grab active:cursor-grabbing"
                  drag={isAnimating ? false : "x"}
                  dragElastic={0.15}
                  dragMomentum={false}
                  dragConstraints={{ left: -lastCloneIndex * trackItemOffset, right: 0 }}
                  onDragEnd={handleDragEnd}
                  initial={false}
                  animate={{ x: -(position * trackItemOffset) }}
                  transition={effectiveTransition}
                  onAnimationStart={() => setIsAnimating(true)}
                  onAnimationComplete={handleAnimationComplete}
                >
                  {itemsForRender.map((p, i) => (
                    <div
                      key={`${p.title}-${i}`}
                      className="h-full shrink-0 select-none"
                      style={{ width }}
                    >
                      {p.image ? (
                        <img
                          src={p.image}
                          alt={p.title}
                          draggable={false}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="relative flex h-full w-full items-center justify-center overflow-hidden p-8"
                          style={{ background: p.gradient }}
                        >
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -bottom-12 -right-2 select-none font-bold leading-none text-transparent"
                            style={{
                              WebkitTextStroke: "1px rgba(255,255,255,0.10)",
                              fontSize: "clamp(9rem, 20vw, 16rem)",
                            }}
                          >
                            {String(projects.indexOf(p) + 1).padStart(2, "0")}
                          </span>
                          <span className="relative text-center font-mono text-[clamp(1rem,2vw,1.5rem)] uppercase tracking-[0.3em] text-white/80">
                            {p.title}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
              {mobileLayout && (
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-1.5">
                  <button
                    type="button"
                    aria-label={t.projects.previous}
                    onClick={prev}
                    className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-white/20 bg-zinc-950/45 text-white backdrop-blur-md transition-colors duration-200 hover:bg-zinc-950/70"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label={t.projects.next}
                    onClick={next}
                    className="pointer-events-auto flex size-9 items-center justify-center rounded-full border border-white/20 bg-zinc-950/45 text-white backdrop-blur-md transition-colors duration-200 hover:bg-zinc-950/70"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
              {mobileLayout && (
                <div className="pointer-events-auto absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {projects.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      aria-label={`${t.projects.goToProject} ${i + 1}`}
                      onClick={() => goTo(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                        ? "w-6 bg-white"
                        : "w-2 bg-white/60 hover:bg-white"
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between">
              <div className={mobileLayout ? "hidden" : "flex gap-2"}>
                {projects.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    aria-label={`${t.projects.goToProject} ${i + 1}`}
                    onClick={() => goTo(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${i === activeIndex
                      ? "w-7 bg-white"
                      : "w-2.5 bg-white/25 hover:bg-white/50"
                      }`}
                  />
                ))}
              </div>
              <div className={mobileLayout ? "hidden" : "flex gap-2"}>
                <button
                  type="button"
                  aria-label={t.projects.previous}
                  onClick={prev}
                  className={`flex items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:bg-white/10 cursor-pointer ${mobileLayout ? "size-11" : "size-12"}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label={t.projects.next}
                  onClick={next}
                  className={`flex items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:bg-white/10 cursor-pointer ${mobileLayout ? "size-11" : "size-12"}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className={mobileLayout ? "hidden" : "w-full projects:hidden"}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                              <ProjectMeta project={project} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="relative flex min-w-0 w-full flex-col lg:flex-1 lg:self-stretch">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className={`relative flex flex-1 flex-col justify-between gap-8 pb-0 2xl:pb-17 ${mobileLayout ? "gap-4" : ""}`}
            >
                <span
                aria-hidden="true"
                className="pointer-events-none absolute select-none font-bold leading-none text-transparent"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.07)",
                  right: mobileLayout ? "0" : "clamp(-4rem, calc(-0.78rem - 2.68vw), -2.5rem)",
                  top: mobileLayout ? "-2.5rem" : "clamp(-4rem, calc(1.36rem - 4.46vw), -1.5rem)",
                  fontSize: mobileLayout ? "clamp(8rem, 38vw, 12rem)" : "clamp(8rem, calc(21.67vw - 7rem), 19rem)",
                }}
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 flex-col justify-start items-start w-full shrink-0">
                <span className={mobileLayout ? "hidden" : "font-mono text-base text-zinc-500"}>
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(projects.length).padStart(2, "0")}
                </span>
                <h3 className={`${mobileLayout ? "mt-0 text-3xl" : "mt-3 whitespace-nowrap text-[clamp(1.75rem,3vw,3rem)]"} font-semibold leading-[1.1] text-white`}>
                  {project.title}
                </h3>
                <motion.div
                  animate={mobileLayout ? { height: descriptionExpanded ? "auto" : 150 } : undefined}
                  initial={false}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className={mobileLayout ? "mt-4 overflow-hidden" : ""}
                >
                  <p className={`whitespace-pre-line text-zinc-400 ${mobileLayout ? "text-base leading-[1.55]" : "text-[clamp(1rem,1.35vw,1.25rem)] xl:leading-relaxed"}`}>
                    <LocaleText block>
                      {t.projects.items[project.id].description}
                    </LocaleText>
                  </p>
                </motion.div>
                {mobileLayout && (
                  <button
                    type="button"
                    onClick={() => setDescriptionExpanded((expanded) => !expanded)}
                    aria-expanded={descriptionExpanded}
                    className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-sm font-medium text-zinc-300 transition-colors hover:text-white"
                  >
                    <LocaleText className="border-b border-white pb-px leading-[1.1]">
                      {descriptionExpanded ? t.projects.readLess : t.projects.readMore}
                    </LocaleText>
                    <motion.svg
                      animate={{ rotate: descriptionExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </motion.svg>
                  </button>
                )}
              </div>

              <div className={mobileLayout ? "block" : "hidden projects:block"}>
                <ProjectMeta project={project} mobileLayout={mobileLayout} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
