export type NavLink = {
  name: string;
  href: string;
  type: 'link' | 'scroll';
};

export type Project = {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  github: string;
  reverse: boolean;
};

export type ContactInfo = {
  platform: string;
  label: string;
  url: string;
  ariaLabel: string;
};
