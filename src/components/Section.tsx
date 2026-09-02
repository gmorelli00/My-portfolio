import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Contenitore unico per tutte le sezioni: una sola misura di gutter, un solo
 * max-width, un solo ritmo verticale. `scroll-mt` compensa la navbar fissa.
 */
export function Section({ id, children, className = '' }: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-6xl scroll-mt-28 px-6 py-20 md:px-8 md:py-28 lg:py-32 ${className}`}
    >
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  index: string;
  title: string;
  /** Testo dell'occhiello: descrive la sezione senza ripeterne il titolo. */
  kicker: string;
  align?: 'start' | 'center';
}

export function SectionHeader({ index, title, kicker, align = 'start' }: SectionHeaderProps) {
  return (
    <Reveal>
      <header className={`mb-12 flex flex-col gap-3 md:mb-16 ${align === 'center' ? 'items-center text-center' : ''}`}>
        <span className="eyebrow">
          {index} — {kicker}
        </span>
        <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{title}</h2>
        <span
          aria-hidden
          className="mt-1 h-px w-16 bg-gradient-to-r from-accent to-transparent"
        />
      </header>
    </Reveal>
  );
}
