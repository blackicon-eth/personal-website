import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import type { PanInfo } from "motion/react";
import { projects } from "@/data/projects";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const AUTOPLAY_DELAY = 5000;
const MANUAL_PAUSE_MS = 3 * 60 * 1000;

export function ProjectCarousel() {
  const { t } = useI18n();
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(1);
  const [paused, setPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
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
      className="flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full lg:w-[55%] shrink-0">
        <div
          ref={viewportRef}
          className="relative aspect-square overflow-hidden rounded-2xl border border-white/10"
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
                      <span className="relative text-center font-mono text-2xl uppercase tracking-[0.3em] text-white/80">
                        {p.title}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {projects.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${t.projects.goToProject} ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-7 bg-white"
                    : "w-2.5 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={t.projects.previous}
              onClick={prev}
              className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:bg-white/10 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label={t.projects.next}
              onClick={next}
              className="flex size-12 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:bg-white/10 cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="relative flex w-full flex-col lg:flex-1 lg:self-stretch">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex flex-1 flex-col justify-between gap-8 lg:pb-17"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 right-0 translate-x-16 select-none font-bold leading-none text-transparent"
              style={{
                WebkitTextStroke: "1px rgba(255,255,255,0.07)",
                fontSize: "clamp(10rem, 22vw, 19rem)",
              }}
            >
              {String(activeIndex + 1).padStart(2, "0")}
            </span>

            <div className="relative">
              <span className="font-mono text-base text-zinc-500">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-4xl font-semibold text-white lg:text-5xl">
                {project.title}
              </h3>
              <p className="mt-4 whitespace-pre-line text-xl leading-relaxed text-zinc-400">
                <LocaleText block>
                  {t.projects.items[project.id].description}
                </LocaleText>
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <span className="block text-sm uppercase tracking-widest text-zinc-600">
                  <LocaleText>{t.projects.techUsed}</LocaleText>
                </span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-base text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {project.links && project.links.length > 0 && (
                <div>
                  <span className="block text-sm uppercase tracking-widest text-zinc-600">
                    <LocaleText>{t.projects.relatedLinks}</LocaleText>
                  </span>
                  <div className="mt-3 flex flex-wrap gap-6">
                    {project.links.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-base text-white underline decoration-zinc-600 underline-offset-4 transition-colors duration-200 hover:decoration-white"
                      >
                        {link.labelKey ? t.projects.links[link.labelKey] : link.label}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                          <path d="M7 17L17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
