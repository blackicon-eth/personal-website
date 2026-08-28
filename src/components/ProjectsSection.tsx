import { ProjectCarousel } from "@/components/ProjectCarousel";

export function ProjectsSection() {
  return (
    <section id="projects" className="min-h-screen w-full py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Selected Work
        </h2>
        <ProjectCarousel />
      </div>
    </section>
  );
}
