import { motion } from "motion/react";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

export function MobileProjectsSection() {
  const { t } = useI18n();

  return (
    <section
      id="projects"
      className="flex min-h-svh w-full flex-col justify-center px-6 py-10"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
          <LocaleText>{t.projects.label}</LocaleText>
        </p>
        <ProjectCarousel mobileLayout />
      </motion.div>
    </section>
  );
}
