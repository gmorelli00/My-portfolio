import { Fragment } from "react";

function Footer() {
  return (
    <Fragment>
      <footer className="mt-50 w-full h-150 text-white flex flex-col justify-center items-center space-y-2 font-montserrat font-thin">
        <h1 id="contact" className="text-5xl font-bold">Contact</h1>
        <div className="flex flex-col justify-center items-center mt-20 w-full space-y-1">
            <p className="text-lg">Email: <a href="mailto:morelligiovannimg@gmail.com" className="text-blue-500 hover:underline">morelligiovannimg@gmail.com</a></p>
            <p className="text-lg">Phone: <a href="tel:+393921205875" className="text-blue-500 hover:underline">+39 392 120 5875</a></p>
            <p className="text-lg">LinkedIn: <a href="https://www.linkedin.com/in/giovanni-morelli-272a1a330/" className="text-blue-500 hover:underline">linkedin.com/in/giovanni-morelli-272a1a330/</a></p>
            <p className="text-lg">GitHub: <a href="https://github.com/gmorelli00" className="text-blue-500 hover:underline">github.com/gmorelli00</a></p>
        </div>
      </footer>
    </Fragment>
  );
}

export default Footer;
