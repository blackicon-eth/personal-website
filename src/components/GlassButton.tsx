import type { ReactNode } from "react";
import { motion } from "motion/react";

type GlassButtonVariant = "primary" | "ghost";
type GlassButtonSize = "sm" | "md" | "lg";

interface GlassButtonProps {
  variant?: GlassButtonVariant;
  size?: GlassButtonSize;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const sizeClasses: Record<GlassButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantClasses: Record<GlassButtonVariant, string> = {
  primary:
    "bg-white/80 text-zinc-900 border border-white/30 shadow-[0_4px_24px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-4px_8px_rgba(0,0,0,0.05)]",
  ghost:
    "bg-white/[0.04] text-zinc-300 border border-white/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.06)]",
};

export function GlassButton({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: GlassButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </motion.button>
  );
}
