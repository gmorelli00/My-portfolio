import { useEffect, useState } from 'react';

/**
 * Restituisce l'id della sezione attualmente in vista, per l'indicatore di
 * posizione nella navbar. Sceglie la sezione visibile più vicina alla cima.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (!elements.length || !('IntersectionObserver' in window)) return;

    const visible = new Map<string, number>();

    const update = () => {
      // L'ultima sezione è corta: a fondo pagina non arriva mai nella fascia
      // osservata, quindi lì vince lei a prescindere.
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) return setActive(elements[elements.length - 1].id);

      if (!visible.size) return;
      const [topMost] = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]));
      setActive(topMost[0]);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        update();
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', update, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
    };
  }, [ids]);

  return active;
}
