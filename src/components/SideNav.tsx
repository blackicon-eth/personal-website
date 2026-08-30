import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { OptionWheel } from "@/components/OptionWheel";

const sections = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "hackathons", label: "Hackathons" },
  { id: "contact", label: "Contact" },
];

export function SideNav() {
  const [active, setActive] = useState(0);
  const navigatingRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (navigatingRef.current) return;
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const unlock = () => {
      navigatingRef.current = false;
      if (unlockTimerRef.current != null) {
        window.clearTimeout(unlockTimerRef.current);
        unlockTimerRef.current = null;
      }
    };

    if (!("onscrollend" in document.documentElement)) return;
    document.addEventListener("scrollend", unlock, { passive: true });
    return () => document.removeEventListener("scrollend", unlock);
  }, []);

  useEffect(
    () => () => {
      if (unlockTimerRef.current != null) {
        window.clearTimeout(unlockTimerRef.current);
      }
    },
    [],
  );

  const handleChange = useCallback((index: number) => {
    navigatingRef.current = true;
    setActive(index);

    if (unlockTimerRef.current != null) {
      window.clearTimeout(unlockTimerRef.current);
    }
    unlockTimerRef.current = window.setTimeout(() => {
      navigatingRef.current = false;
      unlockTimerRef.current = null;
    }, 1600);

    document
      .getElementById(sections[index].id)
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-y-0 right-0 z-50 hidden w-96 lg:block"
    >
      <OptionWheel
        items={sections.map((s) => s.label)}
        selected={active}
        onChange={handleChange}
        onSelect={handleChange}
        side="right"
        fontSize={3}
        spacing={1.4}
        curve={1}
        tilt={6}
        blur={2}
        fade={0.25}
        minOpacity={0.05}
        smoothing={200}
        inset={48}
        textColor="#a1a1aa"
        activeColor="#ffffff"
        className="-translate-y-12"
      />
    </motion.div>
  );
}
