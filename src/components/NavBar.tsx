import { motion } from "motion/react";

const links = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: -12, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, stiffness: 400, damping: 28 },
  },
};

export function NavBar() {
  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring" as const, stiffness: 300, damping: 24, delay: 0.2 }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center pt-8 pb-4"
    >
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="flex gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 backdrop-blur-xl shadow-[0_0_30px_rgba(255,255,255,0.03)]"
      >
        {links.map((link) => (
          <motion.li key={link.href} variants={item}>
            <a
              href={link.href}
              className="inline-block rounded-full px-5 py-2.5 text-base text-zinc-400 transition-colors hover:text-white hover:bg-white/10"
            >
              {link.label}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
}
