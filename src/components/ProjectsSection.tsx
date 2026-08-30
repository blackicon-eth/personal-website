import { ProjectCarousel } from "@/components/ProjectCarousel";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-screen w-full flex-col justify-center py-24"
    >
      <div className="w-full px-24 lg:pr-[26rem]">
        <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-500">
          Selected Work
        </h2>
        <ProjectCarousel />
      </div>
    </section>
  );
}
