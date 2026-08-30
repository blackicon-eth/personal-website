import { motion } from "motion/react";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { HackathonsSection } from "@/components/HackathonsSection";
import { ContactSection } from "@/components/ContactSection";
import { SideNav } from "@/components/SideNav";

export function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-100">
      <SideNav />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <HackathonsSection />
        <ContactSection />
      </motion.div>
    </main>
  );
}
