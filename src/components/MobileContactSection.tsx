import { motion } from "motion/react";
import { FaEnvelope } from "react-icons/fa6";
import { ShinyText } from "@/components/ShinyText";
import { SpecularButton } from "@/components/SpecularButton";
import { Socials } from "@/components/Socials";
import { GradientWaves } from "@/components/GradientWaves";
import { LocaleText } from "@/components/LocaleText";
import { useI18n } from "@/i18n/LocaleProvider";

const EMAIL = "verdecchimattia60@gmail.com";

export function MobileContactSection() {
  const { t } = useI18n();

  return (
    <section
      id="contact"
      className="relative min-h-screen flex w-full flex-col items-center justify-center overflow-hidden px-6"
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
          zoom={0.6}
          height={6}
          fogDepth={18}
          detail="medium"
          brightness={1.3}
          opacity={0.38}
          mouseInteraction={false}
          parallaxStrength={0}
          grain={false}
        />
      </div>

      <div className="relative z-10 w-full text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-mono text-xs uppercase tracking-[0.24em] text-zinc-500"
        >
          <LocaleText>{t.contact.eyebrow}</LocaleText>
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-5 text-[clamp(2.7rem,13vw,4.5rem)] font-bold leading-[1.05]"
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
          className="mx-auto mt-5 max-w-sm text-base leading-relaxed text-zinc-400"
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
          className="mt-8"
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
            followMouse={false}
            proximity={300}
            onClick={() => {
              window.location.href = `mailto:${EMAIL}`;
            }}
          >
            <span className="inline-flex items-center gap-3 text-sm">
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
          className="mt-10 flex justify-center"
        >
          <Socials showEmail={false} size="md" />
        </motion.div>
      </div>
    </section>
  );
}
