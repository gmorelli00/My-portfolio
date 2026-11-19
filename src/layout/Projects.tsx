import { ProjectCard } from '../components/ProjectCard';
import { useScrollTilt } from '../hooks/useScrollTilt';
import { Section, SectionHeader } from '../components/Section';
import { PROJECTS } from '../constants';
import { L } from '../i18n';

function Projects() {
  useScrollTilt();

  return (
    <Section id="projects">
      <SectionHeader index="02" title={L('Progetti', 'Projects')} kicker={L('Lavori scelti', 'Selected work')} />

      <div className="flex flex-col gap-24 md:gap-32">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} index={index} {...project} />
        ))}
      </div>
    </Section>
  );
}

export default Projects;
