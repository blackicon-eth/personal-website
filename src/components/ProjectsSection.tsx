import { ProjectCarousel } from "@/components/ProjectCarousel";

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="flex min-h-screen w-full flex-col justify-center py-24 px-24 lg:pr-70 xl:pr-83 2xl:pr-104"
    >
      <ProjectCarousel />
    </section>
  );
}
