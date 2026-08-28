import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

const images = ["/propics/face-pic.webp", "/propics/acorn-pic.png"];

interface FlipAvatarProps {
  onToggle: () => void;
}

export function FlipAvatar({ onToggle }: FlipAvatarProps) {
  const [rotation, setRotation] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setRotation((r) => r + 180);
      onToggle();
    }, 10000);
  }, [onToggle]);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    startTimer();

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      stopTimer();
    };
  }, [startTimer, stopTimer]);

  const handleClick = () => {
    setRotation((r) => r + 180);
    onToggle();
    startTimer();
  };

  return (
    <div style={{ perspective: 1200 }} className="shrink-0">
      <motion.button
        onClick={handleClick}
        animate={{ rotateY: rotation }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="size-96 relative rounded-full cursor-pointer ring-1 ring-white/20 ring-offset-4 ring-offset-zinc-950 select-none outline-none focus:outline-none"
        style={{ transformStyle: "preserve-3d", WebkitTapHighlightColor: "transparent" }}
      >
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <img src={images[0]} alt="" draggable={false} className="size-full object-cover select-none" />
        </div>
        <div
          className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <img src={images[1]} alt="" draggable={false} className="size-full object-cover select-none" />
        </div>
      </motion.button>
    </div>
  );
}
