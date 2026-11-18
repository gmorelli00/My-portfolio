import { useEffect, useRef } from 'react';

/** Distanza massima (px) entro cui due particelle si collegano. */
const LINK = 120;
/** Raggio d'azione (px) del cursore. */
const REACH = 180;
/** Distanza (px) a cui le particelle agganciate orbitano attorno al cursore. */
const ORBIT = 60;

type Dot = { x: number; y: number; vx: number; vy: number };

/**
 * Costellazione di sfondo: punti che fluttuano, si collegano tra vicini e si
 * agganciano al cursore (o al dito, finché tocca lo schermo). Come
 * MouseProvider, niente state React: un canvas e un loop. Con animazioni
 * ridotte non parte affatto.
 */
export function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canvas || !ctx || reduced) return;

    const color = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-bright');
    let width = 0;
    let height = 0;
    let frame = 0;
    let mouseX = -Infinity;
    let mouseY = -Infinity;
    let dots: Dot[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const sameWidth = width === window.innerWidth;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Su mobile la barra degli indirizzi cambia l'altezza a ogni scroll: se
      // la larghezza è la stessa le particelle restano dove sono.
      if (sameWidth) return;
      dots = Array.from({ length: Math.min(90, Math.round((width * height) / 16000)) }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    const line = (x1: number, y1: number, x2: number, y2: number, alpha: number) => {
      ctx.globalAlpha = alpha;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    };

    const tick = () => {
      frame = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = ctx.strokeStyle = color;

      // ponytail: confronto a coppie O(n²), ~4000 controlli per frame con il
      // tetto a 90 particelle; oltre, passare a una griglia spaziale.
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        const dx = mouseX - dot.x;
        const dy = mouseY - dot.y;
        const dist = Math.hypot(dx, dy);
        if (dist < REACH) {
          // Attratta verso un'orbita attorno al cursore, non verso il centro:
          // così le particelle non collassano tutte nello stesso punto.
          const pull = Math.max(1 - ORBIT / dist, -1) * 0.012;
          dot.x += dx * pull;
          dot.y += dy * pull;
          line(dot.x, dot.y, mouseX, mouseY, (1 - dist / REACH) * 0.45);
        }

        dot.x = (dot.x + dot.vx + width) % width;
        dot.y = (dot.y + dot.vy + height) % height;

        ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.4, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < dots.length; j++) {
          const gap = Math.hypot(dot.x - dots[j].x, dot.y - dots[j].y);
          if (gap < LINK) line(dot.x, dot.y, dots[j].x, dots[j].y, (1 - gap / LINK) * 0.18);
        }
      }
    };

    const onMove = (event: PointerEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    };
    const onLeave = () => {
      mouseX = mouseY = -Infinity;
    };
    // Il dito non "esce" dalla finestra: quando si alza, le linee si sganciano.
    const onRelease = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') onLeave();
    };

    resize();
    tick();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointerup', onRelease);
    window.addEventListener('pointercancel', onRelease);
    return () => {
      window.removeEventListener('pointerup', onRelease);
      window.removeEventListener('pointercancel', onRelease);
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none fixed inset-0 -z-[1] h-full w-full" />;
}
