import type { Project, NavLink, ContactInfo } from '../types';
import { L } from '../i18n';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: 'home' },
  { name: L('Chi sono', 'About'), href: 'about' },
  { name: L('Progetti', 'Projects'), href: 'projects' },
  { name: L('Contatti', 'Contact'), href: 'contact' },
];

export const PROJECTS: Project[] = [
  {
    id: 'cocktail-debacle',
    title: 'Cocktail Debacle',
    year: '2025',
    summary: L(
      'Web app full-stack sul mondo dei cocktail: ricerca globale, ricette condivise, recensioni e profili utente.',
      'Full-stack web app about cocktails: global search, shared recipes, reviews and user profiles.',
    ),
    description: L(
      'Frontend in Angular e backend ASP.NET con SQL Server. Interfaccia responsive costruita su componenti riutilizzabili, con barra di ricerca globale, gestione del profilo (cocktail creati e preferiti), creazione e condivisione di ricette e sistema di recensioni. L’infrastruttura è containerizzata con Docker e orchestrata dietro Nginx come reverse proxy.',
      'Angular frontend and ASP.NET backend with SQL Server. Responsive interface built on reusable components, with a global search bar, profile management (created and favourite cocktails), recipe creation and sharing, and a review system. The infrastructure is containerised with Docker and orchestrated behind Nginx as a reverse proxy.',
    ),
    stack: ['Angular', 'ASP.NET', 'SQL Server', 'Docker', 'Nginx'],
    image: `${import.meta.env.BASE_URL}images/cd.webp`,
    imageAlt: L(
      'Schermata di Cocktail Debacle, web app sui cocktail con frontend Angular e backend ASP.NET',
      'Screenshot of Cocktail Debacle, a cocktail web app with an Angular frontend and ASP.NET backend',
    ),
    github: 'https://github.com/gmorelli00/Cocktail-Debacle',
  },
  {
    id: 'transcendence',
    title: 'Transcendence',
    year: '2025',
    summary: L(
      'Pong multiplayer in tempo reale con grafica 3D, avversario IA e autenticazione OAuth2 — progetto finale a 42.',
      'Real-time multiplayer Pong with 3D graphics, an AI opponent and OAuth2 authentication — final project at 42.',
    ),
    description: L(
      'Single Page Application con frontend in JavaScript vanilla e Three.js per la grafica 3D, backend Django. Integra autenticazione OAuth2 tramite 42 Network, supporto multilingua basato su traduzioni JSON e un avversario artificiale che simula gli input e anticipa le azioni del giocatore. Sistema progettato per essere modulare e scalabile.',
      'Single Page Application with a vanilla JavaScript frontend and Three.js for 3D graphics, Django backend. It integrates OAuth2 authentication through the 42 Network, multilingual support based on JSON translations and an artificial opponent that simulates inputs and anticipates the player’s moves. Designed to be modular and scalable.',
    ),
    stack: ['JavaScript', 'Three.js', 'Django', 'Docker'],
    image: `${import.meta.env.BASE_URL}images/ft_t.webp`,
    imageAlt: L(
      'Schermata di Transcendence, Pong multiplayer con grafica 3D',
      'Screenshot of Transcendence, a multiplayer Pong game with 3D graphics',
    ),
    github: 'https://github.com/gmorelli00/ft_transcendence',
  },
  {
    id: 'ascom-project',
    title: 'Ascom Project',
    year: '2025',
    summary: L(
      'Interfaccia React per la gestione pazienti su API autenticate: griglia con allarmi, filtri e ordinamento.',
      'React interface for patient management on authenticated APIs: grid with alarms, filters and sorting.',
    ),
    description: L(
      'Applicazione frontend sviluppata in React come prova tecnica. Griglia dei dati paziente con allarmi, funzioni di filtro e ordinamento. Il lavoro si è concentrato su componenti riutilizzabili, design responsive e comunicazione con API autenticate.',
      'Frontend application built in React as a technical assessment. Patient data grid with alarms, filtering and sorting. The work focused on reusable components, responsive design and communication with authenticated APIs.',
    ),
    stack: ['React', 'TypeScript'],
    image: `${import.meta.env.BASE_URL}images/ascom.webp`,
    imageAlt: L(
      'Schermata di Ascom Project, griglia dei pazienti con filtri e allarmi',
      'Screenshot of Ascom Project, a patient grid with filters and alarms',
    ),
    github: 'https://github.com/gmorelli00/ascom_project',
  },
];

export const CONTACT_INFO: ContactInfo[] = [
  {
    platform: 'Email',
    label: 'morelligiovannimg@gmail.com',
    url: 'mailto:morelligiovannimg@gmail.com',
    ariaLabel: L('Scrivi a morelligiovannimg@gmail.com', 'Email morelligiovannimg@gmail.com'),
  },
  {
    platform: 'LinkedIn',
    label: 'giovanni-morelli',
    url: 'https://www.linkedin.com/in/giovanni-morelli-272a1a330/',
    ariaLabel: L('Profilo LinkedIn', 'LinkedIn profile'),
  },
  {
    platform: 'GitHub',
    label: 'gmorelli00',
    url: 'https://github.com/gmorelli00',
    ariaLabel: L('Profilo GitHub', 'GitHub profile'),
  },
];

/** Mostrato nella sezione About: rende leggibile lo stack in 3 secondi. */
export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Frontend', items: ['React', 'Angular', 'TypeScript', 'Tailwind', 'Three.js', 'Vite'] },
  { group: 'Backend', items: ['Node.js', 'Django', 'ASP.NET', 'SQL Server'] },
  { group: L('Sistemi', 'Systems'), items: ['C', 'C++', 'Bash', 'Docker', 'Nginx'] },
];

/** Riferimento stabile per useActiveSection (evita effetti che si ri-eseguono). */
export const SECTION_IDS: string[] = NAV_LINKS.map((link) => link.href);
