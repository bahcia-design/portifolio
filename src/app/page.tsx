import ProjectSection from "@/components/ProjectSection";
import SocialLinks from "@/components/SocialLinks";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    <>
      <main className="h-screen snap-y snap-mandatory overflow-y-scroll">
        {projects.map((project) => (
          <ProjectSection key={project.slug} project={project} />
        ))}
      </main>
      <SocialLinks />
    </>
  );
}
