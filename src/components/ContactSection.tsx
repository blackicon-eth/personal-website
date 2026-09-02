import { motion } from "motion/react";
import { FaEnvelope } from "react-icons/fa6";
import { ShinyText } from "@/components/ShinyText";
import { SpecularButton } from "@/components/SpecularButton";
import { Socials } from "@/components/Socials";
import { GradientWaves } from "@/components/GradientWaves";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

const EMAIL = "verdecchimattia60@gmail.com";

export function ContactSection() {
  const { t } = useI18n();
  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden py-24"
    >
      <div aria-hidden="true" className="absolute inset-0">
        <GradientWaves
          horizonColor="#898989"
          waveColor="#000000"
          crestColor="#898989"
          speed={0.4}
          amplitude={2.2}
          waveScale={0.6}
          waveRatio={0.9}
          swell={30}
          turbulence={10}
          tilt={1.3}
          zoom={0.9}
          height={6}
          fogDepth={15}
          detail="high"
          brightness={1.2}
          opacity={0.3}
          mouseInteraction={false}
          parallaxStrength={0}
          grain={false}
        />
      </div>
      <div className="relative z-10 w-full px-24 text-center lg:pr-104">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-mono text-[clamp(0.7rem,0.8vw,1rem)] uppercase tracking-[0.3em] text-zinc-500"
        >
          <LocaleText>{t.contact.eyebrow}</LocaleText>
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 text-[clamp(3rem,5vw,6rem)] font-bold leading-tight"
        >
          <LocaleText block>
            <ShinyText text={t.contact.titleLine1} speed={3} />
            <br />
            <ShinyText text={t.contact.titleLine2} speed={3} />
          </LocaleText>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="mx-auto mt-6 max-w-2xl text-[clamp(1rem,1.35vw,1.25rem)] leading-relaxed text-zinc-400"
        >
          <LocaleText block>
            {t.contact.bodyLine1}
            <br />
            {t.contact.bodyLine2}
          </LocaleText>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10"
        >
          <SpecularButton
            size="lg"
            radius={999}
            tint="#ffffff"
            tintOpacity={0.05}
            blur={8}
            textColor="#fafafa"
            lineColor="#ffffff"
            baseColor="#525252"
            intensity={1.2}
            shineSize={24}
            shineFade={50}
            thickness={1.2}
            followMouse
            proximity={300}
            onClick={() => {
              window.location.href = `mailto:${EMAIL}`;
            }}
          >
            <span className="inline-flex items-center gap-3 text-[clamp(0.9rem,1vw,1.15rem)]">
              <FaEnvelope className="h-5 w-5" />
              {EMAIL}
            </span>
          </SpecularButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-12 flex justify-center"
        >
          <Socials showEmail={false} size="lg" />
        </motion.div>
      </div>
    </section>
  );
}
