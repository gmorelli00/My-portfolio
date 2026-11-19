import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import type { NavLink as NavLinkType } from '../types';
import { NAV_LINKS, SECTION_IDS } from '../constants';
import { useScrollListener } from '../hooks/useScrollListener';
import { useActiveSection } from '../hooks/useActiveSection';
import { L } from '../i18n';

/* Come il vetro di Apple: il vetro resta chiaro e trasparente, è il contenuto
   a cambiare colore. Ogni elemento [data-adapt] guarda cosa ha sotto il proprio
   centro: se c'è una superficie [data-light] riceve data-over-light="true".
   L'alone attorno alle lettere (scuro sotto il testo bianco, chiaro sotto quello
   scuro) serve per i fondi misti: una riga di testo bianco che passa sotto il
   vetro non è una superficie chiara, ma senza alone si mangerebbe le voci. */
const ADAPT =
  '[text-shadow:0_0_2px_rgb(0_0_0/0.9),0_0_10px_rgb(0_0_0/0.7)] ' +
  'data-[over-light=true]:text-ink-deep ' +
  'data-[over-light=true]:[text-shadow:0_0_2px_rgb(255_255_255/0.9),0_0_10px_rgb(255_255_255/0.7)]';

function useAdaptToBackdrop() {
  useEffect(() => {
    const check = () =>
      document.querySelectorAll<HTMLElement>('[data-adapt]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (!r.width) return; // nav nascosta a questo breakpoint
        const under = document.elementsFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        // Una card non ancora entrata (Reveal) è invisibile: sotto c'è ancora il fondo scuro
        el.dataset.overLight = String(
          under.some((u) => u.hasAttribute('data-light') && !u.closest('.reveal:not([data-visible])')),
        );
      });
    check();
    window.addEventListener('scroll', check, { passive: true });
    window.addEventListener('resize', check);
    // Una card che compare (Reveal) cambia il fondo anche a pagina ferma
    document.addEventListener('transitionstart', check);
    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
      document.removeEventListener('transitionstart', check);
    };
  }, []);
}

/* Mappa di spostamento per feDisplacementMap: rosso = quanto spostare in x,
   blu = in y (128 = fermo). Il filtro può pescare solo dentro il vetro, quindi
   la lente è una mappa del riquadro su se stesso: il bordo resta sul bordo e
   ciò che scorre si piega nell'istante in cui tocca la navbar. Appena dentro,
   il fondo è stirato lungo l'orlo (pesca verso il bordo); verso il centro, per
   compenso, è schiacciato. Niente zona piatta: è curvo dall'orlo al centro. */

/** Spostamento (px, ≤ 0 = verso il bordo) a distanza `d` dal bordo, entro una fascia `band`. */
const rimShift = (d: number, band: number) => band * (d / band) ** LENS_POWER - d;

const lensStops = (channel: 'r' | 'b', length: number, band: number, scale: number) => {
  const near = Array.from({ length: 13 }, (_, i) => (i / 12) * band);
  // Un capo e, specchiato, l'altro; in mezzo (sul lato lungo) lo spostamento è zero
  const points = [
    ...near.map((d) => [d, rimShift(d, band)]),
    ...near.reverse().map((d) => [length - d, -rimShift(d, band)]),
  ];
  return points
    .map(([at, shift]) => {
      const v = Math.round(255 * (0.5 + shift / scale));
      return `<stop offset="${at / length}" stop-color="rgb(${channel === 'r' ? `${v},0,0` : `0,0,${v}`})"/>`;
    })
    .join('');
};

const displacementMap = (w: number, h: number) => {
  const band = Math.min(w, h) / 2;
  // Scala = doppio dello spostamento massimo: usa tutti gli 8 bit della mappa
  const scale = 2 * Math.max(...Array.from({ length: 50 }, (_, i) => -rimShift((i / 49) * band, band)));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <linearGradient id="x">${lensStops('r', w, band, scale)}</linearGradient>
    <linearGradient id="y" x2="0" y2="1">${lensStops('b', h, band, scale)}</linearGradient>
    <rect width="${w}" height="${h}" fill="url(#x)"/>
    <rect width="${w}" height="${h}" fill="url(#y)" style="mix-blend-mode:screen"/>
  </svg>`;
  return { href: `data:image/svg+xml,${encodeURIComponent(svg)}`, scale };
};
/** Forza della lente: quanto è schiacciato il fondo al centro (2.5 = 2,5 volte)
 *  e, di riflesso, quanto è stirato sull'orlo. 1 = vetro piatto. */
const LENS_POWER = 2.5;

/**
 * Rifrazione da goccia d'acqua: sotto il vetro il fondo si incurva, come
 * attraverso una lente. È un filtro SVG usato come backdrop-filter, cosa che
 * oggi sa fare solo Chromium; altrove resta il vetro sfocato di .liquid-glass.
 * La mappa è grande quanto l'elemento, quindi si rigenera se cambia misura.
 */
function useRefraction<T extends HTMLElement>(id: string) {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<[number, number] | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    // ponytail: userAgentData esiste solo su Chromium; non c'è un @supports
    // per url() in backdrop-filter. Da togliere quando lo avranno tutti.
    if (!el || !('userAgentData' in navigator)) return;
    const measure = () => el.offsetWidth && setSize([el.offsetWidth, el.offsetHeight]);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!size) return { ref, style: undefined, filter: null };
  const [w, h] = size;
  const map = displacementMap(w, h);
  // Poca sfocatura: con i 22px del vetro normale la curvatura non si vedrebbe
  const backdrop = `url(#${id}) blur(${REFRACT_BLUR}px) saturate(190%) brightness(1.15)`;
  return {
    ref,
    style: { backdropFilter: backdrop, WebkitBackdropFilter: backdrop } as CSSProperties,
    filter: (
      <svg aria-hidden width="0" height="0" className="absolute">
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feImage href={map.href} x="0" y="0" width={w} height={h} result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale={map.scale} xChannelSelector="R" yChannelSelector="B" />
        </filter>
      </svg>
    ),
  };
}
/** Sfocatura (px) del vetro quando c'è la rifrazione. */
const REFRACT_BLUR = 4;

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
            className={`relative whitespace-nowrap rounded-full px-2.5 py-2 text-sm sm:px-4 text-white transition-[opacity,scale] duration-150 active:scale-95 ${ADAPT} ${
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
  const lang = useRefraction<HTMLAnchorElement>('glass-lang');
  const desktop = useRefraction<HTMLElement>('glass-desktop');
  const mobile = useRefraction<HTMLElement>('glass-mobile');

  return (
    <>
      {lang.filter}
      {desktop.filter}
      {mobile.filter}

      {/* Selettore lingua: tondo nell'angolo, stesso posto su desktop e mobile.
          Mostra la lingua verso cui si passa; il link ricarica la pagina (vedi i18n.ts) */}
      <a
        ref={lang.ref}
        style={lang.style}
        href={`?lang=${L('en', 'it')}`}
        aria-label={L('Switch to English', 'Passa all’italiano')}
        data-adapt
        className={`liquid-glass fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full font-mono text-xs text-white opacity-90 transition-opacity duration-150 hover:opacity-100 ${ADAPT}`}
      >
        {L('EN', 'IT')}
      </a>

      {/* Desktop — pillola in alto */}
      <nav
        ref={desktop.ref}
        style={desktop.style}
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
        ref={mobile.ref}
        style={mobile.style}
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
