import { useEffect } from 'react';

/**
 * Al tocco non c'è cursore: per le card `.tilt` fa da cursore lo scroll.
 * --px/--py seguono quanto la card ha attraversato il viewport (0 appena entra
 * dal basso, 1 quando esce in alto). In JS e non con animation-timeline: view(),
 * che su Safari iOS prima della 26 e su Firefox non esiste.
 */
export function useScrollTilt() {
  useEffect(() => {
    if (!window.matchMedia('(hover: none), (pointer: coarse)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      document.querySelectorAll<HTMLElement>('.tilt').forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = Math.min(Math.max(1 - rect.bottom / (window.innerHeight + rect.height), 0), 1);
        el.style.setProperty('--px', (0.1 + progress * 0.8).toFixed(3));
        el.style.setProperty('--py', progress.toFixed(3));
      });
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
}
