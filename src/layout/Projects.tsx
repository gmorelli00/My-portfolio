import { Fragment } from 'react';
import { ProjectCard } from '../components/ProjectCard';
import { PROJECTS } from '../constants';

function Projects() {
  return (
    <Fragment>
      <div className="flex justify-center w-full mb-8 md:mb-16">
        <h1
          className="text-white text-3xl md:text-5xl font-bold font-montserrat px-4 text-center"
          id="projects"
        >
          Projects
        </h1>
      </div>

      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </Fragment>
  );
}

export default Projects;