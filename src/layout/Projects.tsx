import { ProjectCard } from '../components/ProjectCard';
import { Section, SectionHeader } from '../components/Section';
import { PROJECTS } from '../constants';

function Projects() {
  return (
    <Section id="projects">
      <SectionHeader index="02" title="Projects" kicker="Selected work" />

      <div className="flex flex-col gap-24 md:gap-32">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} index={index} {...project} />
        ))}
      </div>
    </Section>
  );
}

export default Projects;
