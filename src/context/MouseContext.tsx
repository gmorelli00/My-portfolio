import React, { useEffect } from 'react';

/**
 * Traccia il mouse senza mai chiamare setState: la posizione finisce in due
 * custom property CSS (--mx / --my) aggiornate una volta per frame, così gli
 * effetti di parallasse sono pura composizione e l'albero React non ri-renderizza.
 */
export const MouseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduced || !fine) return;

    const root = document.documentElement;
    let frame = 0;
    let x = 0;
    let y = 0;

    const flush = () => {
      frame = 0;
      root.style.setProperty('--mx', x.toFixed(4));
      root.style.setProperty('--my', y.toFixed(4));
    };

    const handleMouseMove = (event: MouseEvent) => {
      x = (event.clientX / window.innerWidth) * 2 - 1;
      y = (event.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <>{children}</>;
};
