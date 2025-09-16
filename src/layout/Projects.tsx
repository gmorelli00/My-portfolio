import { Fragment } from "react";

function Projects() {
  return (
    <Fragment>
      <div className="flex justify-center w-full">
        <h1 className="text-white text-5xl font-bold font-montserrat" id="projects">Projects</h1>
      </div>
      <div className="flex justify-between items-center mt-20 w-full">
        <div className="">
          <h2 className="text-white text-3xl font-bold font-montserrat">Cocktail Debacle</h2>
          <p className="text-white text-lg mt-4 font-montserrat font-thin">
            Cocktail Débâcle WebApp is a full-stack web application dedicated to the world<br />
             of cocktails, developed with a TypeScript frontend and an ASP.NET backend<br />
             with SQL Server.<br />
            The project features a modern and responsive interface with reusable components,<br />
            a global search bar, user profile management with created and favorite cocktails,<br />
            recipe creation and sharing, and a review system. The infrastructure is containerized<br />
             with Docker and orchestrated through Nginx as a reverse proxy, ensuring portability,<br />
             reliability, and scalability.
          </p>
          <a href="https://github.com/gmorelli00/Cocktail-Debacle" className="text-blue-500 hover:underline">View on GitHub</a>
        </div>
        <div className="w-1/2">
          <img className="rounded-lg shadow-lg" src="/images/cd.jpeg" alt="Cocktail Debacle Project" />
        </div>
      </div>
      <div className="flex justify-between items-center mt-20 w-full">
        <div className="w-1/2">
          <img className="rounded-lg shadow-lg" src="/images/ft_t.png" alt="transcendence Project" />
        </div>
        <div className="">
          <h2 className="text-white text-3xl font-bold font-montserrat">Transcendence</h2>
          <p className="text-white text-lg mt-4 font-montserrat font-thin">
            Transcendence is a web application developed as the final project at 42,<br />
             focused on building a real-time multiplayer Pong game. The project was<br />
              implemented as a Single Page Application (SPA) with a Vanilla JavaScript<br />
               frontend and Three.js for 3D graphics, and a Django backend.<br />
              The application integrates OAuth2 authentication via 42 Network,<br />
               multilingual support through JSON-based translations, and an artificial<br />
               intelligence opponent capable of simulating inputs and anticipating actions.<br />
              The entire system was designed to be modular, scalable, and with strong<br />
              attention to user experience.
          </p>
          <a href="https://github.com/gmorelli00/ft_transcendence" className="text-blue-500 hover:underline">View on GitHub</a>
        </div>
      </div>
      <div className="flex justify-between items-center mt-20 w-full">
        <div className="">
          <h2 className="text-white text-3xl font-bold font-montserrat">Ascom Project</h2>
          <p className="text-white text-lg mt-4 font-montserrat font-thin">
            Ascom Project is a frontend application developed in React as part of<br />
            a technical assessment. The goal was to build a patient management interface<br />
            consuming protected REST APIs. The application includes a grid displaying patient<br />
            data with alarms, filtering and sorting functionalities, and a detail/edit dialog<br />
            to view and update patient information along with associated parameters.<br />
            The project focused on creating reusable components, ensuring responsive design,<br />
             and integrating API communication with secure authentication.
          </p>
          <a href="https://github.com/gmorelli00/ascom_project" className="text-blue-500 hover:underline">View on GitHub</a>
        </div>
        <div className="w-1/2">
          <img className="rounded-lg shadow-lg" src="/images/ascom.png" alt="Ascom Project" />
        </div>
      </div>
    </Fragment>
  );
}

export default Projects;