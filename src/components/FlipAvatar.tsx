import { motion } from "motion/react";

const images = ["/propics/face-pic.webp", "/propics/acorn-pic.png"];

interface FlipAvatarProps {
  side: number;
  flipping: boolean;
  onFlipStart: () => void;
  onMidFlip: () => void;
}

export function FlipAvatar({ side, flipping, onFlipStart, onMidFlip }: FlipAvatarProps) {
  return (
    <motion.button
      onClick={() => {
        if (flipping) return;
        onFlipStart();
      }}
      className="size-96 shrink-0 rounded-full overflow-hidden cursor-pointer ring-1 ring-white/20 ring-offset-4 ring-offset-zinc-950 select-none outline-none focus:outline-none"
      animate={{ rotateY: flipping ? 90 : 0 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={() => {
        if (flipping) onMidFlip();
      }}
      style={{ perspective: 800, WebkitTapHighlightColor: "transparent" }}
    >
      <img src={images[side]} alt="" className="size-full object-cover select-none" draggable={false} />
    </motion.button>
  );
}
