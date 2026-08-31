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

export function HeroSection() {
  const { t } = useI18n();
  const [side, setSide] = useState(0);

  const handleToggle = useCallback(() => {
    setSide((s) => (s === 0 ? 1 : 0));
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col overflow-hidden bg-zinc-950"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="absolute inset-0"
      >
        <Aurora
          colorStops={["#5227FF", "#7cff67", "#5227FF"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </motion.div>
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
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute right-10 top-6 z-[60] flex items-center gap-3"
      >
        <LocationPill />
        <LocaleSwitcher />
      </motion.div>
      <div className="relative z-10 flex w-full flex-1 items-center px-24 lg:pr-104 pt-9">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-[33%] flex justify-center pr-4"
        >
          <FlipAvatar
            onToggle={handleToggle}
          />
        </motion.div>
        <div className="flex-1 text-left shrink-0 pl-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={side}
                className="min-h-32"
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
                  fontSize={96}
                  fontWeight={700}
                  letterSpacing={-2}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-4 max-w-4xl text-[22px] leading-relaxed text-zinc-400 pl-3"
          >
            <LocaleText block>
              {t.hero.intro}
              <br />
              {t.hero.blurb}
            </LocaleText>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-8 pl-3 flex items-center gap-4"
          >
            <GlassButton
              variant="primary"
              size="md"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              <LocaleText>{t.hero.viewMyWork}</LocaleText>
            </GlassButton>
            <GlassButton
              variant="outline"
              size="md"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              <LocaleText>{t.hero.getInTouch}</LocaleText>
            </GlassButton>
          </motion.div>
        </div>
      </div>
      <div className="relative z-10 w-full px-24 lg:pr-104 pb-25">
        <h2 className="mb-8 text-xl font-medium uppercase tracking-[0.2em] text-zinc-400">
          <LocaleText>{t.hero.mySkills}</LocaleText>
        </h2>
        <SkillsLoop />
      </div>
    </section>
  );
}
