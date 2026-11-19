import { useEffect, useLayoutEffect, useRef } from 'react';
import type { NavLink as NavLinkType } from '../types';
import { NAV_LINKS, SECTION_IDS } from '../constants';
import { useScrollListener } from '../hooks/useScrollListener';
import { useActiveSection } from '../hooks/useActiveSection';
import { L } from '../i18n';

/* Come il vetro di Apple: il vetro resta chiaro e trasparente, è il contenuto
   a cambiare colore. Ogni elemento [data-adapt] guarda cosa ha sotto il proprio
   centro: se c'è una superficie [data-light] riceve data-over-light="true". */
const ADAPT = 'data-[over-light=true]:text-ink-deep';

function useAdaptToBackdrop() {
  useEffect(() => {
    const check = () =>
      document.querySelectorAll<HTMLElement>('[data-adapt]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width) return; // nav nascosta a questo breakpoint
        const under = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        el.dataset.overLight = String(under.some((u) => u.hasAttribute('data-light')));
      });
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, []);
}

/** Voci di navigazione con una sola pillola che scivola sotto quella attiva. */
function Track({ active, className }: { active: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);

  // Layout effect: la prima posizione è scritta prima del paint, quindi la
  // pillola compare già al suo posto e si anima solo ai cambi successivi.
  useLayoutEffect(() => {
    const track = ref.current;
    if (!track) return;
    const place = () => {
      const link = track.querySelector<HTMLElement>('[aria-current]');
      if (!link) return;
      track.style.setProperty('--pill-x', `${link.offsetLeft}px`);
      track.style.setProperty('--pill-w', `${link.offsetWidth}px`);
    };
    place();
    // Ricalcola a resize, cambio breakpoint e caricamento del font
    const observer = new ResizeObserver(place);
    observer.observe(track);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div ref={ref} className={`group relative flex items-center ${className}`}>
      {/* La pillola segue il colore della voce attiva, non la propria posizione */}
      <span
        aria-hidden
        style={{ width: 'var(--pill-w, 0)', transform: 'translate(var(--pill-x, 0), -50%)' }}
        className="pointer-events-none absolute left-0 top-1/2 h-9 rounded-full bg-white/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_2px_8px_rgb(0_0_0/0.25)] transition-[transform,width,background-color] duration-500 ease-[cubic-bezier(0.34,1.4,0.64,1)] group-has-[[aria-current][data-over-light=true]]:bg-ink-deep/10"
      />
      {NAV_LINKS.map((link: NavLinkType) => {
        const isActive = active === link.href;
        return (
          <a
            key={link.name}
            href={`#${link.href}`}
            data-adapt
            aria-current={isActive ? 'true' : undefined}
            className={`relative rounded-full px-4 py-2 text-sm text-white transition-[color,opacity] duration-300 ${ADAPT} ${
              isActive ? '' : 'opacity-70 hover:opacity-100'
            }`}
          >
            {link.name}
          </a>
        );
      })}
    </div>
  );
}

function Navbar() {
  const scrolled = useScrollListener(40);
  const active = useActiveSection(SECTION_IDS);
  useAdaptToBackdrop();

  return (
    <>
      {/* Selettore lingua: tondo nell'angolo, stesso posto su desktop e mobile.
          Mostra la lingua verso cui si passa; il link ricarica la pagina (vedi i18n.ts) */}
      <a
        href={`?lang=${L('en', 'it')}`}
        aria-label={L('Switch to English', 'Passa all’italiano')}
        data-adapt
        className={`liquid-glass fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full font-mono text-xs text-white opacity-90 transition-[color,opacity] duration-300 hover:opacity-100 ${ADAPT}`}
      >
        {L('EN', 'IT')}
      </a>

      {/* Desktop — pillola in alto */}
      <nav
        /* Si rimpicciolisce con scale, non col padding: niente ricalcolo del layout
           (e del blur) a ogni fotogramma, quindi niente scatti */
        className={`liquid-glass fixed left-1/2 top-5 z-50 hidden origin-top -translate-x-1/2 rounded-full
          px-3 py-2 transition-[scale] duration-300 ease-out md:block
          ${scrolled ? 'scale-90' : ''}`}
        role="navigation"
        aria-label={L('Navigazione principale', 'Main navigation')}
      >
        <Track active={active} className="gap-1" />
      </nav>

      {/* Mobile — tab bar in basso, dove arriva il pollice */}
      <nav
        className="liquid-glass fixed inset-x-4 bottom-4 z-50 rounded-full md:hidden"
        role="navigation"
        aria-label={L('Navigazione principale', 'Main navigation')}
      >
        <Track active={active} className="justify-around px-2 py-2" />
      </nav>
    </>
  );
}

export default Navbar;
