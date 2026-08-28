import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Aurora } from "@/components/Aurora";
import { StrokeText } from "@/components/StrokeText";
import { FlipAvatar } from "@/components/FlipAvatar";
import { GlassButton } from "@/components/GlassButton";

const names = ["Mattia Verdecchi", "blackicon.eth"];

export function HeroSection() {
  const [side, setSide] = useState(0);

  const handleToggle = useCallback(() => {
    setSide((s) => (s === 0 ? 1 : 0));
  }, []);

  return (
    <section
      id="hero"
      className="relative flex items-center justify-center min-h-screen overflow-hidden bg-zinc-950"
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
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-zinc-950 z-[4]" />
      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] items-center px-8 -translate-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-[35%] flex justify-end pr-8"
        >
          <FlipAvatar
            onToggle={handleToggle}
          />
        </motion.div>
        <div className="flex-1 text-left pl-8 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={side}
                className="min-h-[8rem]"
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
            Full-Stack Engineer focused on building products users love.
            <br />
            Founder, hacker, and rapid prototyper. Experienced in taking ideas
            from zero to production with TypeScript, React, Next.js, and
            AI-assisted development.
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
              View my work
            </GlassButton>
            <GlassButton
              variant="outline"
              size="md"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get in touch
            </GlassButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
