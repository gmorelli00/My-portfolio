import type { Project, NavLink, ContactInfo } from '../types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: 'home', type: 'scroll' },
  { name: 'About', href: 'about', type: 'scroll' },
  { name: 'Projects', href: 'projects', type: 'scroll' },
  { name: 'Contact', href: 'contact', type: 'scroll' },
];

export const PROJECTS: Project[] = [
  {
    id: 'cocktail-debacle',
    title: 'Cocktail Debacle',
    year: '2025',
    summary:
      'Web app full-stack sul mondo dei cocktail: ricerca globale, ricette condivise, recensioni e profili utente.',
    description:
      'Frontend in TypeScript e backend ASP.NET con SQL Server. Interfaccia responsive costruita su componenti riutilizzabili, con barra di ricerca globale, gestione del profilo (cocktail creati e preferiti), creazione e condivisione di ricette e sistema di recensioni. L’infrastruttura è containerizzata con Docker e orchestrata dietro Nginx come reverse proxy.',
    stack: ['TypeScript', 'ASP.NET', 'SQL Server', 'Docker', 'Nginx'],
    image: `${import.meta.env.BASE_URL}images/cd.webp`,
    imageAlt:
      'Cocktail Debacle full-stack web application with TypeScript frontend and ASP.NET backend',
    github: 'https://github.com/gmorelli00/Cocktail-Debacle',
  },
  {
    id: 'transcendence',
    title: 'Transcendence',
    year: '2025',
    summary:
      'Pong multiplayer in tempo reale con grafica 3D, avversario IA e autenticazione OAuth2 — progetto finale a 42.',
    description:
      'Single Page Application con frontend in JavaScript vanilla e Three.js per la grafica 3D, backend Django. Integra autenticazione OAuth2 tramite 42 Network, supporto multilingua basato su traduzioni JSON e un avversario artificiale che simula gli input e anticipa le azioni del giocatore. Sistema progettato per essere modulare e scalabile.',
    stack: ['JavaScript', 'Three.js', 'Django', 'WebSocket', 'OAuth2'],
    image: `${import.meta.env.BASE_URL}images/ft_t.webp`,
    imageAlt: 'Transcendence multiplayer Pong game application with 3D graphics',
    github: 'https://github.com/gmorelli00/ft_transcendence',
  },
  {
    id: 'ascom-project',
    title: 'Ascom Project',
    year: '2025',
    summary:
      'Interfaccia React per la gestione pazienti su API REST protette: griglia con allarmi, filtri e dialog di modifica.',
    description:
      'Applicazione frontend sviluppata in React come prova tecnica. Griglia dei dati paziente con allarmi, funzioni di filtro e ordinamento, e dialog di dettaglio per visualizzare e aggiornare le informazioni e i parametri associati. Il lavoro si è concentrato su componenti riutilizzabili, design responsive e comunicazione con API autenticate.',
    stack: ['React', 'TypeScript', 'REST API', 'Auth'],
    image: `${import.meta.env.BASE_URL}images/ascom.webp`,
    imageAlt:
      'Ascom patient management interface with data grid and filtering capabilities',
    github: 'https://github.com/gmorelli00/ascom_project',
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
    label: 'giovanni-morelli',
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

/** Mostrato nella sezione About: rende leggibile lo stack in 3 secondi. */
export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['React', 'TypeScript', 'Tailwind', 'Three.js', 'Vite'] },
  { group: 'Backend', items: ['Node.js', 'Django', 'ASP.NET', 'SQL Server'] },
  { group: 'Systems', items: ['C', 'C++', 'Bash', 'Docker', 'Nginx'] },
];

/** Riferimento stabile per useActiveSection (evita effetti che si ri-eseguono). */
export const SECTION_IDS: string[] = NAV_LINKS.map((link) => link.href);
