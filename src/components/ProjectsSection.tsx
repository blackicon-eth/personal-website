import { motion } from "motion/react";
import { ProjectCarousel } from "@/components/ProjectCarousel";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-screen w-full flex-col justify-center py-24 px-24 lg:pr-70 xl:pr-83 2xl:pr-104"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <ProjectCarousel />
      </motion.div>
    </section>
  );
}
