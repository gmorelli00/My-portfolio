import { CONTACT_INFO } from '../constants';

function Footer() {
  return (
    <footer className="mt-16 md:mt-24 lg:mt-32 w-full py-12 md:py-16 lg:py-20 text-white flex flex-col justify-center items-center space-y-6 md:space-y-8 font-montserrat font-thin px-4">
      <h2 id="contact" className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
        Contact
      </h2>

      <div className="flex flex-col justify-center items-center mt-6 md:mt-8 w-full space-y-3 md:space-y-4">
        {CONTACT_INFO.map((contact) => (
          <p key={contact.platform} className="text-base md:text-lg text-center break-words">
            <span className="font-semibold">{contact.platform}:</span>{' '}
            <a
              href={contact.url}
              target={contact.platform !== 'Email' ? '_blank' : undefined}
              rel={contact.platform !== 'Email' ? 'noopener noreferrer' : undefined}
              className="text-blue-500 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-1 transition-colors"
              aria-label={contact.ariaLabel}
            >
              {contact.label}
            </a>
          </p>
        ))}
      </div>

      <p className="text-sm text-gray-400 mt-8">
        © 2024 Giovanni Morelli. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
