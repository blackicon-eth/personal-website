import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { OptionWheel } from "@/components/OptionWheel";
import { useI18n } from "@/i18n/LocaleProvider";
import type { Dictionary } from "@/i18n/dictionaries";

const sectionIds = [
  "hero",
  "projects",
  "experience",
  "hackathons",
  "contact",
] as const;

type SectionId = (typeof sectionIds)[number];

const navKey: Record<SectionId, keyof Dictionary["nav"]> = {
  hero: "home",
  projects: "projects",
  experience: "experience",
  hackathons: "hackathons",
  contact: "contact",
};

export function SideNav() {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  const navigatingRef = useRef(false);
  const unlockTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (navigatingRef.current) return;
            const idx = sectionIds.findIndex((id) => id === entry.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
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
    window.dispatchEvent(new Event("site:navigate"));

    if (unlockTimerRef.current != null) {
      window.clearTimeout(unlockTimerRef.current);
    }
    unlockTimerRef.current = window.setTimeout(() => {
      navigatingRef.current = false;
      unlockTimerRef.current = null;
    }, 1600);

    document
      .getElementById(sectionIds[index])
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
        items={sectionIds.map((id) => t.nav[navKey[id]])}
        selected={active}
        onChange={handleChange}
        onSelect={handleChange}
        side="right"
        draggable={false}
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
