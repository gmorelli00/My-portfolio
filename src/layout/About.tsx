import { Fragment } from "react";

function About() {
  return (
    <Fragment>
        <div className="text-white w-full">
            <h1 className="text-5xl font-bold font-montserrat">About me</h1>
            <p className="text-lg mt-4 font-montserrat font-thin">
                Junior software developer with a strong technical background acquired at 42 Firenze.<br />
                Excellent command of C, C++, Bash, and web technologies. Proactive personality,<br />
                quick learner, and experienced in working in peer-to-peer team environments.<br />
                I am passionate about developing web applications and software, with a particular<br />
                 focus on frontenddevelopment. I enjoy turning ideas and concepts into intuitive and<br />
                 functional interfaces, paying attentionto both user experience and visual design.
                
            </p>
        </div>
        <div className="text-white text-right w-full mt-30">
          <h1 className="text-5xl font-bold font-montserrat">Interests</h1>
          <p className="text-lg mt-4 font-montserrat font-thin">
            My goal is to grow as a frontend developer by deepening my knowledge of modern frameworks and best<br />
            practices in web development. I aspire to work on innovative projects that allow me to combine creativity<br />
            and technical skills, contributing to scalable and high-quality solutions.
          </p>
        </div>
    </Fragment>
  );
}

export default About;