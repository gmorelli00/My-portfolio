import type { Project } from '../types';
import { Reveal } from './Reveal';

interface ProjectCardProps extends Project {
  index: number;
}

export function ProjectCard({
  title,
  summary,
  description,
  stack,
  year,
  image,
  imageAlt,
  github,
  demo,
  index,
}: ProjectCardProps) {
  const reverse = index % 2 === 1;

  return (
    <Reveal>
      <article
        className={`group grid items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
          reverse ? 'lg:[&>figure]:order-last' : ''
        }`}
      >
        <figure className="relative overflow-hidden rounded-card border border-white/10 bg-white/5">
          <img
            src={image}
            alt={imageAlt}
            loading="lazy"
            decoding="async"
            className="aspect-video w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          {/* Velo che raccorda l'immagine al fondo scuro */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"
          />
        </figure>

        <div className="flex flex-col items-start gap-5">
          <div className="flex items-baseline gap-4">
            <span className="eyebrow">{year}</span>
            <h3 className="text-2xl font-bold md:text-3xl">{title}</h3>
          </div>

          <p className="max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
            {summary}
          </p>

          <ul className="flex flex-wrap gap-2">
            {stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>

          <details className="group/details w-full max-w-[52ch]">
            <summary className="cursor-pointer list-none text-sm text-accent-bright transition-colors hover:text-white">
              <span className="link-underline">
                Dettagli tecnici
                <span aria-hidden className="ml-1 inline-block transition-transform group-open/details:rotate-90">
                  ›
                </span>
              </span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-muted">{description}</p>
          </details>

          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline text-sm font-medium text-white"
              aria-label={`View ${title} on GitHub`}
            >
              Codice su GitHub ↗
            </a>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm font-medium text-accent-bright"
                aria-label={`Open the ${title} live demo`}
              >
                Demo live ↗
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
