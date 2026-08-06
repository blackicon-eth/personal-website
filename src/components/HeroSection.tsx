import { motion } from "motion/react";
import SideRays from "@/components/SideRays";
import { StrokeText } from "@/components/StrokeText";

export function HeroSection() {
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
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </motion.div>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-zinc-950 z-[4]" />
      <div className="relative z-10 flex items-center gap-12 px-8">
        <div className="size-48 shrink-0 rounded-full bg-white/5 ring-1 ring-white/10" />
        <div className="text-left">
          <StrokeText
            text="Your Name"
            strokeColor="#EAB308"
            fillColor="#F8FAFC"
            strokeWidth={1.4}
            drawDuration={1.2}
            fillDelay={0.15}
            stagger={0.04}
            fontSize={64}
            fontWeight={700}
            letterSpacing={-1}
          />
          <p className="mt-3 max-w-md text-lg leading-relaxed text-zinc-400">
            A short description about yourself — what you do, what you are passionate about, and what makes you tick.
          </p>
        </div>
      </div>
    </section>
  );
}
