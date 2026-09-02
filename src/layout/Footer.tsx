import type { ReactNode } from 'react';
import { Section, SectionHeader } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { CONTACT_INFO } from '../constants';

const ICONS: Record<string, ReactNode> = {
  Email: (
    <path d="M3 6.5h18v11H3zM3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  ),
  LinkedIn: (
    <path
      d="M4.5 9h2.7v9H4.5zM5.85 4.5a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2zM10 9h2.6v1.3a2.9 2.9 0 0 1 2.6-1.4c2 0 3.3 1.3 3.3 3.8V18h-2.7v-4.8c0-1.2-.5-1.9-1.5-1.9s-1.6.7-1.6 1.9V18H10z"
      fill="currentColor"
    />
  ),
  GitHub: (
    <path
      d="M12 3a9 9 0 0 0-2.85 17.54c.45.08.61-.2.61-.43v-1.5c-2.5.54-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.07 1.38.93 1.38.93.8 1.38 2.1.98 2.62.75.08-.58.31-.98.57-1.2-2-.23-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.1-.23-.4-1.15.09-2.4 0 0 .75-.24 2.47.92a8.6 8.6 0 0 1 4.5 0c1.72-1.16 2.47-.92 2.47-.92.49 1.25.18 2.17.09 2.4.58.63.93 1.44.93 2.42 0 3.46-2.1 4.22-4.11 4.44.32.28.61.83.61 1.68v2.49c0 .24.16.52.62.43A9 9 0 0 0 12 3z"
      fill="currentColor"
    />
  ),
};

function Footer() {
  const email = CONTACT_INFO.find((c) => c.platform === 'Email');

  return (
    <Section id="contact" className="pb-12 md:pb-16">
      <SectionHeader index="03" title="Contact" kicker="Get in touch" />

      <div className="flex flex-col gap-12">
        <Reveal delay={80}>
          <p className="max-w-[42ch] text-lg leading-relaxed text-muted">
            Cerchi qualcuno per il frontend del tuo prodotto? Scrivimi, rispondo sempre.
          </p>
        </Reveal>

        {email && (
          <Reveal delay={160}>
            <a
              href={email.url}
              className="link-underline inline-block break-all text-2xl font-bold text-white transition-colors hover:text-accent-bright sm:text-3xl md:text-4xl lg:text-5xl"
              aria-label={email.ariaLabel}
            >
              {email.label}
            </a>
          </Reveal>
        )}

        <Reveal delay={240}>
          <ul className="flex flex-wrap gap-3">
            {CONTACT_INFO.map((contact) => (
              <li key={contact.platform}>
                <a
                  href={contact.url}
                  target={contact.platform === 'Email' ? undefined : '_blank'}
                  rel={contact.platform === 'Email' ? undefined : 'noopener noreferrer'}
                  aria-label={contact.ariaLabel}
                  className="glass flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm text-muted transition-colors hover:bg-white/10 hover:text-white"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
                    {ICONS[contact.platform]}
                  </svg>
                  {contact.platform}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <footer className="mt-24 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-8 text-xs text-muted sm:flex-row sm:items-center">
        <p>© {new Date().getFullYear()} Giovanni Morelli</p>
        <p className="font-mono">Built with React, Three.js &amp; Tailwind</p>
      </footer>
    </Section>
  );
}

export default Footer;
