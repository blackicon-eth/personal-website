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
      <p className="mb-5 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
        <LocaleText>{t.projects.label}</LocaleText>
      </p>
      <ProjectCarousel mobileLayout />
    </section>
  );
}
