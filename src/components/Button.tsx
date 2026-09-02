import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium ' +
  'transition-[background-color,color,border-color,transform] duration-300 ' +
  'hover:-translate-y-0.5 active:translate-y-0 ' +
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-ink-deep hover:bg-accent-bright',
  secondary: 'glass text-white hover:bg-white/10',
  ghost: 'text-muted hover:text-white',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 text-sm md:text-base',
  lg: 'px-7 py-3.5 text-base',
};

interface StyleProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: StyleProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: StyleProps & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <a className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
