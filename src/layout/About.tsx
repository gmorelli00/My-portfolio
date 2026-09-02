import { Section, SectionHeader } from '../components/Section';
import { Reveal } from '../components/Reveal';
import { SKILLS } from '../constants';

function About() {
  return (
    <Section id="about">
      <SectionHeader index="01" title="About" kicker="Background" />

      <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="flex flex-col gap-6">
          <Reveal delay={80}>
            <p className="max-w-[62ch] text-lg leading-relaxed text-white md:text-xl">
              Sviluppatore software con una base tecnica costruita a{' '}
              <span className="text-accent-bright">42 Firenze</span>: C, C++, Bash e
              tecnologie web. Mi muovo bene in team peer-to-peer e imparo in fretta.
            </p>
          </Reveal>
          <Reveal delay={160}>
            <p className="max-w-[62ch] leading-relaxed text-muted">
              Quello che mi interessa davvero è il frontend: trasformare idee e concetti in
              interfacce intuitive, curando insieme l&apos;esperienza d&apos;uso e il design
              visivo. Il mio obiettivo è crescere approfondendo i framework moderni e le best
              practice, lavorando su progetti dove creatività e competenza tecnica si
              incontrano.
            </p>
          </Reveal>
        </div>

        <Reveal delay={240}>
          <dl className="flex flex-col gap-8">
            {SKILLS.map((group) => (
              <div key={group.group} className="flex flex-col gap-3">
                <dt className="eyebrow">{group.group}</dt>
                <dd>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs text-muted transition-colors hover:border-accent/40 hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </Section>
  );
}

export default About;
