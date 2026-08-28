import type { ReactNode } from "react";
import { motion } from "motion/react";

type GlassButtonVariant = "primary" | "outline";
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
    "bg-white text-zinc-900 border border-white shadow-[0_4px_24px_rgba(255,255,255,0.08),inset_0_1px_0_rgba(255,255,255,0.5),inset_0_-4px_8px_rgba(0,0,0,0.05)] hover:bg-zinc-200",
  outline:
    "bg-transparent text-white border border-white/30 hover:bg-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]",
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
      className={`inline-flex items-center justify-center rounded-full font-medium transition-colors duration-200 cursor-pointer ${sizeClasses[size]} ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </motion.button>
  );
}
