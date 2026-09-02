import { useEffect, useState } from 'react';

/** True quando la pagina ha superato la soglia: serve a dare "peso" alla navbar. */
export function useScrollListener(threshold: number = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > threshold);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
