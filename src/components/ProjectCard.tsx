import type { PointerEvent } from 'react';
import type { Project } from '../types';
import { Reveal } from './Reveal';
import { L } from '../i18n';

/** Scrive in --px/--py (0–1) dove si trova il cursore dentro l'immagine: le legge `.tilt`. */
function trackPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return;
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--px', ((event.clientX - rect.left) / rect.width).toFixed(3));
  el.style.setProperty('--py', ((event.clientY - rect.top) / rect.height).toFixed(3));
}

interface ProjectCardProps extends Project {
  index: number;
}

export function ProjectCard({
  id,
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
      {/* L'id rende il progetto raggiungibile con un link diretto (…/#transcendence) */}
      <article
        id={id}
        className={`group grid scroll-mt-28 items-center gap-8 lg:grid-cols-2 lg:gap-14 ${
          reverse ? 'lg:[&>figure]:order-last' : ''
        }`}
      >
        {/* data-light: gli screenshot sono chiari, la navbar sopra passa al testo scuro */}
        <figure
          data-light
          onPointerMove={trackPointer}
          className="tilt relative overflow-hidden rounded-card border border-white/10 bg-white/5"
        >
          {/* Fuori dall'ordine di tabulazione: da tastiera c'è già il link testuale sotto */}
          <a href={demo ?? github} target="_blank" rel="noopener noreferrer" tabIndex={-1} className="block">
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-video w-full object-cover"
            />
          </a>
          {/* Velo che raccorda l'immagine al fondo scuro */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent"
          />
        </figure>

        <div className="flex flex-col items-start gap-5">
          <div className="flex items-baseline gap-4">
            <span className="eyebrow">{year}</span>
            <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-accent-bright md:text-3xl">{title}</h3>
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
                {L('Dettagli tecnici', 'Technical details')}
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
              aria-label={L(`Codice di ${title} su GitHub`, `${title} code on GitHub`)}
            >
              {L('Codice su GitHub', 'Code on GitHub')} ↗
            </a>
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline text-sm font-medium text-accent-bright"
                aria-label={L(`Demo live di ${title}`, `${title} live demo`)}
              >
                {L('Demo live', 'Live demo')} ↗
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
