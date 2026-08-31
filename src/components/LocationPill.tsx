import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { FaLocationDot } from "react-icons/fa6";

function getRomeOffsetHours(date: Date): number {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Rome",
    hourCycle: "h23",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const map: Record<string, string> = {};
  for (const part of dtf.formatToParts(date)) {
    map[part.type] = part.value;
  }
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour) % 24,
    Number(map.minute),
    Number(map.second),
  );
  return Math.round((asUtc - date.getTime()) / 3600000);
}

export function LocationPill() {
  const [offset, setOffset] = useState(() => getRomeOffsetHours(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => {
      setOffset(getRomeOffsetHours(new Date()));
    }, 60 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="absolute right-10 top-6 z-20 flex items-center gap-2.5 rounded-full border border-white/10 bg-zinc-950/60 px-5 py-2.5 backdrop-blur-md"
    >
      <FaLocationDot className="h-4.5 w-4.5 text-zinc-400" />
      <span className="text-sm font-medium text-zinc-300">Rome, Italy</span>
      <span className="h-1 w-1 rounded-full bg-zinc-500" />
      <span className="text-sm font-medium text-zinc-300">GMT+{offset}</span>
    </motion.div>
  );
}
