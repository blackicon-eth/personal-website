import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";
import { useI18n } from "@/i18n/LocaleProvider";

interface LocaleTextProps {
  children: ReactNode;
  className?: string;
  block?: boolean;
}

export function LocaleText({ children, className, block = false }: LocaleTextProps) {
  const { locale } = useI18n();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={locale}
        className={
          `${block ? "block" : "inline-block"} ${className ?? ""}`.trim() ||
          undefined
        }
        initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}
