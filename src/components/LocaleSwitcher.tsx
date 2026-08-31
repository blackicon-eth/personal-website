import { FaGlobe } from "react-icons/fa6";
import { locales, type Locale } from "@/i18n/config";
import { useI18n } from "@/i18n/LocaleProvider";
import { LocaleText } from "@/components/LocaleText";

const short: Record<Locale, string> = {
  en: "EN",
  it: "IT",
};

export function LocaleSwitcher() {
  const { locale, setLocale } = useI18n();
  const idx = locales.indexOf(locale);
  const next = locales[(idx + 1) % locales.length];

  return (
    <button
      type="button"
      onClick={() => setLocale(next)}
      aria-label={`Switch to ${short[next]}`}
      title={`Switch to ${short[next]}`}
      className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-950/60 px-5 py-2.5 backdrop-blur-md text-sm font-medium text-zinc-300 transition-colors hover:text-white cursor-pointer"
    >
      <FaGlobe className="h-4.5 w-4.5 text-zinc-400" />
      <span className="text-sm font-medium uppercase tracking-wider">
        <LocaleText>{short[next]}</LocaleText>
      </span>
    </button>
  );
}
