import { Fragment } from "react";
import { motion } from "motion/react";
import { experience } from "@/data/experience";
import { ExperienceImage } from "@/components/ExperienceImage";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

function linkify(text: string) {
  return text.split(/(\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (!match) return <Fragment key={i}>{part}</Fragment>;
    return (
      <a
        key={i}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-white underline decoration-zinc-600 underline-offset-4 transition-colors duration-200 hover:decoration-white"
      >
        {match[1]}
      </a>
    );
  });
}

export function MobileExperienceSection() {
  const { t } = useI18n();

  return (
    <section id="experience" className="w-full px-6 py-10">
      <p className="mb-8 text-xs font-medium uppercase tracking-[0.24em] text-zinc-500">
        <LocaleText>{t.nav.experience}</LocaleText>
      </p>

      <div className="relative flex flex-col gap-12 pl-6">
        <div className="absolute bottom-0 left-1 top-0 w-px bg-white/10" />
        {experience.map((item, i) => {
          const content = t.experience.items[item.id];

          return (
            <motion.article
              key={item.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative"
            >
              <div className="relative">
                <span className="absolute -left-[1.6rem] top-1/2 z-10 block size-3 -translate-y-1/2 rounded-full border-2 border-white/20 bg-zinc-950" />
                <div className="overflow-hidden rounded-xl border border-white/10">
                  {item.image ? (
                    <ExperienceImage
                      src={item.image}
                      alt={item.company}
                      background={item.background}
                      aspectRatio="16 / 8"
                    />
                  ) : (
                    <div className="flex aspect-16/8 items-center justify-center" style={{ background: item.background }}>
                      <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/60">
                        {item.company}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                  <LocaleText>{content.period}</LocaleText>
                </span>
                <h3 className="mt-1.5 text-2xl font-semibold text-white">{item.company}</h3>
                <p className="text-base text-zinc-300">
                  <LocaleText>{content.role}</LocaleText>
                </p>
                <p className="mt-3.5 text-base leading-[1.55] text-zinc-400">
                  <LocaleText block>{linkify(content.description)}</LocaleText>
                </p>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
