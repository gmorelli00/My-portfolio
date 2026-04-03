import type { Project } from '../types';

interface ProjectCardProps extends Project {}

export function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  github,
  reverse,
}: ProjectCardProps) {
  return (
    <article
      className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} lg:justify-between lg:items-start gap-6 md:gap-10 mt-8 md:mt-16 lg:mt-20 w-full`}
    >
      <div className={`flex-1 ${!reverse ? 'lg:pr-6' : 'lg:pl-6'}`}>
        <h2 className="text-white text-2xl md:text-3xl font-bold font-montserrat">
          {title}
        </h2>
        <p className="text-white text-base md:text-lg mt-3 md:mt-4 font-montserrat font-thin leading-relaxed">
          {description}
        </p>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1 transition-all text-sm md:text-base"
          aria-label={`View ${title} on GitHub`}
        >
          View on GitHub
        </a>
      </div>
      <div className="flex-1">
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="rounded-lg shadow-lg w-full h-auto object-cover"
        />
      </div>
    </article>
  );
}
