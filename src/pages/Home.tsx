import { Suspense, lazy, type ReactNode } from 'react';
import { SEO } from '../components/SEO';
import { ErrorBoundary } from '../components/ErrorBoundary';
import Hero from '../components/Hero';
import About from '../layout/About';
import Projects from '../layout/Projects';
import Footer from '../layout/Footer';

// three.js pesa ~800 KB: tenerlo fuori dal bundle iniziale rende
// il primo paint immediato e carica la scena solo quando serve.
const AvatarScene = lazy(() => import('../components/AvatarScene'));

function AvatarFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative aspect-square w-full max-w-[34rem]">
      {/* Alone dietro all'avatar: lo àncora invece di lasciarlo galleggiare */}
      <span
        aria-hidden
        className="absolute inset-[8%] -z-10 rounded-full bg-accent/20 blur-3xl"
      />
      {children}
    </div>
  );
}

function AvatarFallback() {
  return (
    <img
      src={`${import.meta.env.BASE_URL}images/me.svg`}
      alt="Illustrazione di Giovanni Morelli"
      className="h-full w-full object-contain"
    />
  );
}

function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Giovanni Morelli - Full Stack Developer. Specializing in React, TypeScript, and modern web technologies."
      />

      <section
        id="home"
        className="mx-auto flex min-h-[100svh] w-full max-w-6xl scroll-mt-28 flex-col-reverse items-center gap-10 px-6 pb-24 pt-28 md:px-8 lg:flex-row lg:gap-16 lg:pt-32"
      >
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <AvatarFrame>
            {/* Se WebGL non è disponibile o il modello non carica,
                cade sull'illustrazione invece di far saltare la pagina. */}
            <ErrorBoundary fallback={<AvatarFallback />}>
              <Suspense fallback={<div className="h-full w-full animate-pulse rounded-full bg-white/5" />}>
                <AvatarScene />
              </Suspense>
            </ErrorBoundary>
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
