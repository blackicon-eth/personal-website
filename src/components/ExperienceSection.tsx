import { Fragment } from "react";
import { motion } from "motion/react";
import { experience } from "@/data/experience";
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

function Entry({
  index,
  company,
  role,
  period,
  description,
  image,
  gradient,
}: {
  index: number;
  company: string;
  role: string;
  period: string;
  description: string;
  image?: string;
  gradient: string;
}) {
  const reversed = index % 2 === 1;

  return (
    <div className="relative grid grid-cols-1 items-center gap-6 pl-12 lg:grid-cols-[1fr_5rem_1fr] lg:gap-0 lg:pl-0">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className={`w-full ${
          reversed
            ? "lg:col-start-3 lg:justify-self-start"
            : "lg:col-start-1 lg:justify-self-end"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10">
          {image ? (
            <img
              src={image}
              alt={company}
              className="aspect-[16/8] w-full object-cover"
            />
          ) : (
            <div
              className="flex aspect-[16/8] items-center justify-center"
              style={{ background: gradient }}
            >
              <span className="font-mono text-sm uppercase tracking-[0.3em] text-white/60">
                {company}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      <div className="hidden lg:col-start-2 lg:row-start-1 lg:flex lg:items-center lg:justify-center">
        <span className="block size-4 rounded-full border-2 border-white/20 bg-zinc-950" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        className={`relative ${
          reversed ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-3"
        }`}
      >
        <span className="font-mono text-sm uppercase tracking-widest text-zinc-500">
          <LocaleText>{period}</LocaleText>
        </span>
        <h3 className="mt-3 text-3xl font-semibold text-white">{company}</h3>
        <p className="mt-1 text-lg text-zinc-300">
          <LocaleText>{role}</LocaleText>
        </p>
        <p className="mt-4 text-lg leading-relaxed text-zinc-400">
          <LocaleText block>{linkify(description)}</LocaleText>
        </p>
      </motion.div>
    </div>
  );
}

export function ExperienceSection() {
  const { t } = useI18n();
  return (
    <section
      id="experience"
      className="flex min-h-screen w-full flex-col justify-center py-24"
    >
      <div className="w-full px-24 lg:pr-[26rem]">
        <div className="relative flex flex-col gap-24">
          <div className="absolute bottom-0 left-4 top-0 w-px bg-white/10 lg:left-1/2 lg:-translate-x-1/2" />
          {experience.map((item, i) => {
            const content = t.experience.items[item.id];
            return (
              <Entry
                key={item.company}
                index={i}
                company={item.company}
                role={content.role}
                period={content.period}
                description={content.description}
                image={item.image}
                gradient={item.gradient}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
