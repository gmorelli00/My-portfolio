import type { Project, NavLink, ContactInfo } from '../types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '/', type: 'link' },
  { name: 'Projects', href: 'projects', type: 'scroll' },
  { name: 'Contact', href: 'contact', type: 'scroll' },
];

export const PROJECTS: Project[] = [
  {
    id: 'cocktail-debacle',
    title: 'Cocktail Debacle',
    description:
      'Cocktail Débâcle WebApp is a full-stack web application dedicated to the world of cocktails, developed with a TypeScript frontend and an ASP.NET backend with SQL Server. The project features a modern and responsive interface with reusable components, a global search bar, user profile management with created and favorite cocktails, recipe creation and sharing, and a review system. The infrastructure is containerized with Docker and orchestrated through Nginx as a reverse proxy, ensuring portability, reliability, and scalability.',
    image: './images/cd.jpeg',
    imageAlt:
      'Cocktail Debacle full-stack web application with TypeScript frontend and ASP.NET backend',
    github: 'https://github.com/gmorelli00/Cocktail-Debacle',
    reverse: false,
  },
  {
    id: 'transcendence',
    title: 'Transcendence',
    description:
      'Transcendence is a web application developed as the final project at 42, focused on building a real-time multiplayer Pong game. The project was implemented as a Single Page Application (SPA) with a Vanilla JavaScript frontend and Three.js for 3D graphics, and a Django backend. The application integrates OAuth2 authentication via 42 Network, multilingual support through JSON-based translations, and an artificial intelligence opponent capable of simulating inputs and anticipating actions. The entire system was designed to be modular, scalable, and with strong attention to user experience.',
    image: './images/ft_t.png',
    imageAlt: 'Transcendence multiplayer Pong game application with 3D graphics',
    github: 'https://github.com/gmorelli00/ft_transcendence',
    reverse: true,
  },
  {
    id: 'ascom-project',
    title: 'Ascom Project',
    description:
      'Ascom Project is a frontend application developed in React as part of a technical assessment. The goal was to build a patient management interface consuming protected REST APIs. The application includes a grid displaying patient data with alarms, filtering and sorting functionalities, and a detail/edit dialog to view and update patient information along with associated parameters. The project focused on creating reusable components, ensuring responsive design, and integrating API communication with secure authentication.',
    image: './images/ascom.png',
    imageAlt:
      'Ascom patient management interface with data grid and filtering capabilities',
    github: 'https://github.com/gmorelli00/ascom_project',
    reverse: false,
  },
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    platform: 'Email',
    label: 'morelligiovannimg@gmail.com',
    url: 'mailto:morelligiovannimg@gmail.com',
    ariaLabel: 'Send email to morelligiovannimg@gmail.com',
  },
  {
    platform: 'LinkedIn',
    label: 'giovanni-morelli-272a1a330',
    url: 'https://www.linkedin.com/in/giovanni-morelli-272a1a330/',
    ariaLabel: 'Visit LinkedIn profile',
  },
  {
    platform: 'GitHub',
    label: 'gmorelli00',
    url: 'https://github.com/gmorelli00',
    ariaLabel: 'Visit GitHub profile',
  },
];
