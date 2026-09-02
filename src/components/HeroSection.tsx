import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Aurora } from "@/components/Aurora";
import { StrokeText } from "@/components/StrokeText";
import { FlipAvatar } from "@/components/FlipAvatar";
import { GlassButton } from "@/components/GlassButton";
import { SkillsLoop } from "@/components/SkillsLoop";
import { Socials } from "@/components/Socials";
import { LocationPill } from "@/components/LocationPill";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

const names = ["Mattia Verdecchi", "blackicon.eth"];

interface HeroSectionProps {
  showSocialsPill?: boolean;
  showLocationPill?: boolean;
  languageOnLeft?: boolean;
  showLanguageSwitcher?: boolean;
  mobileLayout?: boolean;
}

export function HeroSection({
  showSocialsPill = true,
  showLocationPill = true,
  languageOnLeft = false,
  showLanguageSwitcher = true,
  mobileLayout = false,
}: HeroSectionProps) {
  const { t } = useI18n();
  const [side, setSide] = useState(0);

  const handleToggle = useCallback(() => {
    setSide((s) => (s === 0 ? 1 : 0));
  }, []);

  return (
    <section
      id="hero"
      className={`relative flex flex-col overflow-hidden bg-zinc-950 ${mobileLayout ? "justify-between min-h-svh" : "min-h-screen"}`}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="absolute inset-0"
      >
        <Aurora
          colorStops={["#5227FF", "#7cff67", "#5227FF"]}
          blend={mobileLayout ? 0.3 : 0.5}
          amplitude={mobileLayout ? 0.5 : 1.0}
          speed={0.5}
        />
      </motion.div>
      {showSocialsPill && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute left-10 top-6 z-20 flex items-center gap-4 rounded-full border border-white/10 bg-zinc-950/60 px-5 py-2.5 backdrop-blur-md"
        >
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-zinc-300">
            <LocaleText>{t.hero.findMeOn}</LocaleText>
          </span>
          <Socials />
        </motion.div>
      )}
      {showLanguageSwitcher && <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={`absolute top-6 z-60 flex items-center gap-3 ${languageOnLeft ? "left-6" : "right-10"
          }`}
      >
        {showLocationPill && <LocationPill />}
        <LocaleSwitcher />
      </motion.div>}
      <div
        className={`relative z-10 flex w-full px-24 lg:pr-54 xl:pr-76 2xl:pr-104 ${mobileLayout
          ? "flex flex-1 flex-col items-center justify-center h-full px-7! text-center"
          : "flex-1 items-center pt-9"
          }`}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className={mobileLayout ? "flex w-[58%] tall:w-[62%] justify-center" : "flex w-[33%] justify-center pr-4"}
        >
          <FlipAvatar
            onToggle={handleToggle}
          />
        </motion.div>
        <div
          className={`flex flex-col justify-center ${mobileLayout ? "mt-4 w-full items-center text-center" : "items-start text-left pl-4"
            }`}
        >
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={side}
                className="w-full"
                initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <StrokeText
                  text={names[side]}
                  strokeColor="#A8A29E"
                  fillColor="#F8FAFC"
                  strokeWidth={1.4}
                  drawDuration={1.4}
                  fillDelay={0.0}
                  stagger={0.05}
                  fontSize={mobileLayout ? 48 : 86}
                  fontWeight={700}
                  letterSpacing={-2}
                  padding={0.04}
                  referenceText={mobileLayout ? undefined : names[0]}
                  align={mobileLayout ? "center" : "left"}
                  svgHeight={mobileLayout ? "3.15rem" : undefined}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            className={`max-w-4xl text-zinc-400 ${mobileLayout ? "text-[0.96rem] tall:text-[1.12rem] leading-normal mt-3 pl-0" : "mt-4 pl-2 leading-relaxed text-[clamp(1rem,1.5vw,1.375rem)]"
              }`}
          >
            <LocaleText block>
              {mobileLayout ? t.hero.mobileIntro : t.hero.intro}
              <br />
              {mobileLayout ? t.hero.mobileBlurb : t.hero.blurb}
            </LocaleText>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className={`flex items-center ${mobileLayout ? "pl-0 mt-6 gap-2" : "pl-3 mt-8 gap-4"
              }`}
          >
            <GlassButton
              variant="primary"
              size="md"
              className={mobileLayout ? "w-[clamp(9.5rem,40vw,13rem)] whitespace-nowrap" : undefined}
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <LocaleText>{t.hero.viewMyWork}</LocaleText>
            </GlassButton>
            <GlassButton
              variant="outline"
              size="md"
              className={mobileLayout ? "w-[clamp(9.5rem,40vw,13rem)] whitespace-nowrap" : undefined}
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <LocaleText>{t.hero.getInTouch}</LocaleText>
            </GlassButton>
          </motion.div>
        </div>
      </div>
      <div className={`relative z-10 w-full px-24 lg:pr-66 xl:pr-87 2xl:pr-104 ${mobileLayout ? "px-8! pb-6" : "pb-25"}`}>
        <h2 className={`font-medium uppercase tracking-[0.2em] text-zinc-400 ${mobileLayout ? "text-sm tall:text-base mb-6" : "text-xl mb-8"}`}>
          <LocaleText>{t.hero.mySkills}</LocaleText>
        </h2>
        <SkillsLoop gap={mobileLayout ? 36 : 64} itemSize={mobileLayout ? 48 : 64} clickToOpen={mobileLayout} portalPopover={mobileLayout} />
      </div>
    </section>
  );
}
