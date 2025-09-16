import { Fragment } from "react";
import About from "../layout/About";
import Projects from "../layout/Projects";
import Footer from "../layout/Footer";

function Home() {
  return (
    <Fragment>
        <section className="flex h-5/10 mt-50 flex-row justify-center items-center">
            <div className="flex w-1/2 justify-center items-center">
                <img src="/images/me.svg" alt="GM" className="h-80 ml-40" />
            </div>
            <div className="flex flex-col w-1/2 h-full text-white text-start justify-center items-start ">
                <h2 className="text-6xl font-bold font-montserrat font-bold">I'm <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Giovanni Morelli</span>,<br />a software developer.</h2>
            </div>
        </section>
        <section className="flex flex-col p-20 justify-start items-start font-montserrat font-thin mt-10">
          <About />
        </section>
      <section className="flex flex-col p-20 justify-start items-start font-montserrat font-thinmt-30">
        <Projects />
      </section>
      <section className="flex w-full h-20 p-20 justify-center items-center">
        <Footer />
      </section>
    </Fragment>
  );
}

export default Home;
