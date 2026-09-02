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

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }

        if (!visible.size) return;
        const [topMost] = [...visible.entries()].sort((a, b) => Math.abs(a[1]) - Math.abs(b[1]));
        setActive(topMost[0]);
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
