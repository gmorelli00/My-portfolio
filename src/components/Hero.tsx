import { ButtonLink } from './Button';
import { CONTACT_INFO } from '../constants';
import { L } from '../i18n';

const email = CONTACT_INFO.find((c) => c.platform === 'Email');

export default function Hero() {
  return (
    <div className="flex flex-col items-start gap-7">

      <h1
        className="animate-rise text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl"
        style={{ animationDelay: '60ms' }}
      >
        {L('Sono', 'I’m')} <span className="name-shine">Giovanni Morelli</span>
        {L(', sviluppatore software.', ', a software developer.')}
      </h1>

      <p
        className="animate-rise max-w-[46ch] text-base leading-relaxed text-muted md:text-lg"
        style={{ animationDelay: '140ms' }}
      >
        {L(
          'Costruisco interfacce web veloci e curate nel dettaglio. Formazione a 42 Firenze, background solido in C/C++ e una passione precisa per il frontend.',
          'I build fast, carefully crafted web interfaces. Trained at 42 Firenze, with a solid C/C++ background and a real passion for frontend.',
        )}
      </p>

      <div className="animate-rise flex flex-wrap items-center gap-3" style={{ animationDelay: '220ms' }}>
        <ButtonLink href="#projects">{L('Guarda i progetti', 'View projects')}</ButtonLink>
        {email && (
          <ButtonLink variant="secondary" href={email.url}>
            {L('Scrivimi', 'Get in touch')}
          </ButtonLink>
        )}
      </div>
    </div>
  );
}
