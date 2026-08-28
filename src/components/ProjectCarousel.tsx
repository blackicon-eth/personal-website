import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValue } from "motion/react";
import type { PanInfo } from "motion/react";
import { projects } from "@/data/projects";

const SPRING = { type: "spring", stiffness: 300, damping: 30 } as const;
const AUTOPLAY_DELAY = 5000;

export function ProjectCarousel() {
  const [width, setWidth] = useState(0);
  const [position, setPosition] = useState(1);
  const [paused, setPaused] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const x = useMotionValue(0);
  const viewportRef = useRef<HTMLDivElement>(null);

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
    if (paused || itemsForRender.length <= 1) return;
    const id = setInterval(() => {
      setPosition((p) => Math.min(p + 1, lastCloneIndex));
    }, AUTOPLAY_DELAY);
    return () => clearInterval(id);
  }, [paused, itemsForRender.length, lastCloneIndex]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING;

  const handleAnimationComplete = () => {
    if (itemsForRender.length <= 1) return;
    if (position === lastCloneIndex) {
      setIsJumping(true);
      setPosition(1);
      x.set(-trackItemOffset);
      requestAnimationFrame(() => setIsJumping(false));
    } else if (position === 0) {
      setIsJumping(true);
      setPosition(projects.length);
      x.set(-projects.length * trackItemOffset);
      requestAnimationFrame(() => setIsJumping(false));
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

  const next = () =>
    setPosition((p) => Math.min(p + 1, lastCloneIndex));
  const prev = () => setPosition((p) => Math.max(p - 1, 0));
  const goTo = (i: number) => setPosition(i + 1);

  const project = projects[activeIndex];

  return (
    <div
      className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative w-full lg:w-[420px] shrink-0">
        <div
          ref={viewportRef}
          className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"
        >
          {width > 0 && (
            <motion.div
              className="flex h-full cursor-grab active:cursor-grabbing"
              drag="x"
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              initial={false}
              animate={{ x: -(position * trackItemOffset) }}
              transition={effectiveTransition}
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
                      className="flex h-full w-full items-end p-6"
                      style={{ background: p.gradient }}
                    >
                      <span className="font-mono text-sm text-white/60">
                        project
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
                aria-label={`Go to project ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-6 bg-white"
                    : "w-2 bg-white/25 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous project"
              onClick={prev}
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:bg-white/10 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={next}
              className="flex size-10 items-center justify-center rounded-full border border-white/15 text-white transition-colors duration-200 hover:bg-white/10 cursor-pointer"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full lg:flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <span className="font-mono text-sm text-zinc-500">
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-3xl font-semibold text-white lg:text-4xl">
              {project.title}
            </h3>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-400">
              {project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
