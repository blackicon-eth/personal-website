import { FaEnvelope } from "react-icons/fa6";
import { ShinyText } from "@/components/ShinyText";
import { Socials } from "@/components/Socials";
import { useI18n } from "@/i18n/LocaleProvider";

const EMAIL = "verdecchimattia60@gmail.com";

export function MobileGate() {
  const { t } = useI18n();

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-zinc-950 lg:hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 35%, rgba(82,39,255,0.18) 0%, rgba(124,255,103,0.05) 45%, transparent 70%)",
        }}
      />
      <div className="relative flex min-h-full flex-col items-center justify-center gap-6 px-8 py-12 text-center">
        <span className="font-mono text-xs uppercase tracking-[0.35em] text-zinc-500">
          {t.mobile.greeting}
        </span>
        <h1 className="text-5xl font-bold leading-tight md:text-6xl">
          <ShinyText text={t.mobile.title} speed={3} />
        </h1>
        <p className="max-w-md text-lg leading-relaxed text-zinc-400">
          {t.mobile.description}
        </p>
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-6 py-3 text-base text-zinc-200 transition-colors hover:bg-white/5"
        >
          <FaEnvelope className="h-4 w-4" />
          {EMAIL}
        </a>
        <Socials showEmail={false} size="lg" />
      </div>
    </div>
  );
}
