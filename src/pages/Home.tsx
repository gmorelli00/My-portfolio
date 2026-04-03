import { SEO } from '../components/SEO';
import About from '../layout/About';
import Projects from '../layout/Projects';
import Footer from '../layout/Footer';

function Home() {
  return (
    <>
      <SEO
        title="Home"
        description="Giovanni Morelli - Full Stack Developer. Specializing in React, TypeScript, and modern web technologies."
      />

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row min-h-screen gap-6 md:gap-10 justify-center items-center px-4 md:px-8 pt-32 md:pt-40">
        <div className="flex w-full lg:w-1/2 justify-center items-center order-2 lg:order-1">
          <img
            src="/images/me.svg"
            alt=""
            className="h-60 md:h-80 lg:h-96"
            aria-hidden="true"
          />
        </div>
        <article className="flex flex-col w-full lg:w-1/2 justify-center items-start text-white text-start order-1 lg:order-2">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-montserrat leading-tight">
            I'm{' '}
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
              Giovanni Morelli
            </span>
            , a software developer.
          </h1>
        </article>
      </section>

      {/* About Section */}
      <section className="flex flex-col px-4 md:px-8 lg:px-20 py-12 md:py-20 justify-start items-start font-montserrat font-thin">
        <About />
      </section>

      {/* Projects Section */}
      <section className="flex flex-col px-4 md:px-8 lg:px-20 py-12 md:py-20 justify-start items-start font-montserrat font-thin">
        <Projects />
      </section>

      {/* Footer Section */}
      <section className="flex w-full px-4 md:px-8 lg:px-20 justify-center items-center">
        <Footer />
      </section>
    </>
  );
}

export default Home;
