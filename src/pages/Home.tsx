import { Suspense, lazy, useEffect, useState, type ReactNode } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Hero from '../components/Hero';
import About from '../layout/About';
import Projects from '../layout/Projects';
import Footer from '../layout/Footer';
import { L } from '../i18n';

// three.js pesa ~800 KB: tenerlo fuori dal bundle iniziale rende
// il primo paint immediato; nel frattempo si vede il segnaposto.
const AvatarScene = lazy(() => import('../components/AvatarScene'));

function AvatarFrame({ ready, children }: { ready: boolean; children: ReactNode }) {
  // iOS concede il giroscopio solo dopo un tocco sull'avatar (la richiesta è in
  // AvatarScene): finché non arriva lo si dice. Android non ne ha bisogno.
  // requestPermission esiste anche su alcuni browser desktop: conta solo al tocco.
  const [hint, setHint] = useState(
    () =>
      window.matchMedia('(hover: none), (pointer: coarse)').matches &&
      typeof (window.DeviceOrientationEvent as { requestPermission?: unknown } | undefined)
        ?.requestPermission === 'function',
  );

  return (
    <div
      className="animate-rise relative aspect-square w-full max-w-[34rem]"
      onClick={() => ready && setHint(false)}
    >
      {hint && ready && (
        <span className="eyebrow pointer-events-none absolute inset-x-0 bottom-0 text-center">
          {L('Tocca l’avatar, poi inclina il telefono', 'Tap the avatar, then tilt your phone')}
        </span>
      )}
      {/* Alone dietro all'avatar: lo àncora invece di lasciarlo galleggiare */}
      <span
        aria-hidden
        className="absolute inset-[8%] -z-10 rounded-full bg-accent/20 blur-3xl transition-transform duration-300 ease-out"
        // Parallasse: --mx/--my arrivano da MouseProvider (o dal giroscopio, vedi
        // AvatarScene), l'alone va in senso opposto al cursore
        style={{ transform: 'translate3d(calc(var(--mx, 0) * -28px), calc(var(--my, 0) * -28px), 0)' }}
      />
      {children}
    </div>
  );
}

function Home() {
  const [avatarReady, setAvatarReady] = useState(false);

  // Al primo caricamento il browser cerca l'ancora prima che React abbia
  // montato le sezioni: i link diretti (…/#transcendence) vanno onorati qui.
  useEffect(() => {
    const id = decodeURIComponent(window.location.hash.slice(1));
    if (id) document.getElementById(id)?.scrollIntoView();
  }, []);

  return (
    <>
      <section
        id="home"
        className="mx-auto flex min-h-[100svh] w-full max-w-6xl scroll-mt-28 flex-col-reverse items-center gap-10 px-6 pb-24 pt-16 md:px-8 md:pt-28 lg:flex-row lg:gap-16 lg:pt-32"
      >
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <AvatarFrame ready={avatarReady}>
            <div className="avatar-cutout absolute inset-0">
              {/* Fotogramma dell'avatar, stessa inquadratura del canvas: si vede
                  subito e sfuma quando il modello è pronto. Se WebGL manca o il
                  modello non carica, resta lui. */}
              <img
                src={`${import.meta.env.BASE_URL}images/avatar-poster.webp`}
                alt={L('Avatar 3D di Giovanni Morelli', '3D avatar of Giovanni Morelli')}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
                  avatarReady ? 'opacity-0' : ''
                }`}
              />
              <ErrorBoundary fallback={null}>
                <Suspense fallback={null}>
                  <AvatarScene onReady={() => setAvatarReady(true)} />
                </Suspense>
              </ErrorBoundary>
            </div>
          </AvatarFrame>
        </div>

        <div className="flex w-full items-center lg:w-1/2">
          <Hero />
        </div>
      </section>

      <About />
      <Projects />
      <Footer />
    </>
  );
}

export default Home;
