import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NavLink as NavLinkType } from '../types';
import { NAV_LINKS, SECTION_IDS } from '../constants';
import { useScrollListener } from '../hooks/useScrollListener';
import { useActiveSection } from '../hooks/useActiveSection';

function Navbar() {
  const navigate = useNavigate();
  const scrolled = useScrollListener(40);
  const active = useActiveSection(SECTION_IDS);

  const handleNavClick = useCallback(
    (link: NavLinkType) => {
      if (link.type === 'scroll') {
        document.getElementById(link.href)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate(link.href);
      }
    },
    [navigate],
  );

  const item = (link: NavLinkType) => {
    const isActive = active === link.href;
    return (
      <button
        key={link.name}
        onClick={() => handleNavClick(link)}
        aria-current={isActive ? 'true' : undefined}
        className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-muted hover:text-white'
        }`}
      >
        {/* Pillola dell'elemento attivo, sotto al testo */}
        {isActive && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-white/15"
          />
        )}
        {link.name}
      </button>
    );
  };

  return (
    <>
      {/* Desktop — pillola in alto */}
      <nav
        className={`fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 rounded-full border border-white/10
          bg-gradient-to-br from-white/10 via-accent/10 to-white/10 bg-[length:400%_400%]
          animate-glass-glow backdrop-blur-xl backdrop-saturate-150 transition-all duration-500 md:block
          ${scrolled ? 'px-2 py-1.5 shadow-2xl shadow-black/40' : 'px-3 py-2'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center gap-1">{NAV_LINKS.map(item)}</div>
      </nav>

      {/* Mobile — tab bar in basso, dove arriva il pollice */}
      <nav
        className="fixed inset-x-4 bottom-4 z-50 rounded-2xl border border-white/10 bg-ink-deep/70
          backdrop-blur-xl backdrop-saturate-150 shadow-2xl shadow-black/50 md:hidden"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-around px-2 py-2">{NAV_LINKS.map(item)}</div>
      </nav>
    </>
  );
}

export default Navbar;
