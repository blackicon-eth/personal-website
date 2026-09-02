import type { Project } from "@/data/projects";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

interface ProjectMetaProps {
  project: Project;
}

export function ProjectMeta({ project }: ProjectMetaProps) {
  const { t } = useI18n();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <span className="block text-[clamp(0.7rem,0.8vw,0.875rem)] uppercase tracking-widest text-zinc-600">
          <LocaleText>{t.projects.techUsed}</LocaleText>
        </span>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[clamp(0.8rem,0.9vw,1rem)] text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {project.links && project.links.length > 0 && (
        <div>
          <span className="block text-[clamp(0.7rem,0.8vw,0.875rem)] uppercase tracking-widest text-zinc-600">
            <LocaleText>{t.projects.relatedLinks}</LocaleText>
          </span>
          <div className="mt-3 flex flex-wrap gap-6">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[clamp(0.8rem,0.9vw,1rem)] text-white underline decoration-zinc-600 underline-offset-4 transition-colors duration-200 hover:decoration-white"
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
  );
}
