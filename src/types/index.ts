export type NavLink = {
  name: string;
  href: string;
  type: 'link' | 'scroll';
};

export type Project = {
  id: string;
  title: string;
  /** Una riga che si legge in 2 secondi: è quella che decide se aprire il resto. */
  summary: string;
  description: string;
  stack: string[];
  year: string;
  image: string;
  imageAlt: string;
  github: string;
  demo?: string;
};

export type ContactInfo = {
  platform: string;
  label: string;
  url: string;
  ariaLabel: string;
};
