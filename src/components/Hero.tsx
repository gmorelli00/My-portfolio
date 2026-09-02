import { Button, ButtonLink } from './Button';
import { CONTACT_INFO } from '../constants';

const email = CONTACT_INFO.find((c) => c.platform === 'Email');

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

/**
 * Il parallasse legge le custom property --mx/--my scritte da MouseProvider:
 * nessuno state React, nessun re-render, solo composizione GPU.
 */
const parallax = (depth: number) => ({
  transform: `translate3d(calc(var(--mx, 0) * ${depth}px), calc(var(--my, 0) * ${depth}px), 0)`,
});

export default function Hero() {
  return (
    <div className="flex flex-col items-start gap-7">
      <p className="eyebrow animate-rise">Firenze, Italia — disponibile</p>

      <h1
        className="animate-rise text-4xl font-bold leading-[1.05] transition-transform duration-300 ease-out sm:text-5xl lg:text-6xl xl:text-7xl"
        style={{ ...parallax(14), animationDelay: '60ms' }}
      >
        I&apos;m{' '}
        <span className="bg-gradient-to-r from-accent-bright to-accent bg-clip-text text-transparent">
          Giovanni Morelli
        </span>
        , a software developer.
      </h1>

      <p
        className="animate-rise max-w-[46ch] text-base leading-relaxed text-muted transition-transform duration-300 ease-out md:text-lg"
        style={{ ...parallax(7), animationDelay: '140ms' }}
      >
        Costruisco interfacce web veloci e curate nel dettaglio. Formazione a 42 Firenze,
        background solido in C/C++ e una passione precisa per il frontend.
      </p>

      <div className="animate-rise flex flex-wrap items-center gap-3" style={{ animationDelay: '220ms' }}>
        <Button size="lg" onClick={() => scrollTo('projects')}>
          Guarda i progetti
        </Button>
        {email && (
          <ButtonLink variant="secondary" size="lg" href={email.url}>
            Scrivimi
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
