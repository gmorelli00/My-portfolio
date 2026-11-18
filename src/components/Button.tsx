import React from 'react';

type ButtonVariant = 'primary' | 'secondary';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium ' +
  'transition-[background-color,color,border-color,box-shadow] duration-300';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-ink-deep hover:bg-accent-bright hover:shadow-[0_10px_32px_-8px] hover:shadow-accent/60',
  secondary: 'glass text-white hover:bg-white/10',
};

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: { variant?: ButtonVariant } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
