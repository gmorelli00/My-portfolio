import { useCallback } from 'react';
import type { NavLink as NavLinkType } from '../types';
import { NAV_LINKS } from '../constants';

function Navbar() {
  const handleNavClick = useCallback((link: NavLinkType) => {
    if (link.type === 'scroll') {
      document.getElementById(link.href)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = link.href;
    }
  }, []);

  return (
    <nav
      className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] md:w-auto mt-5 rounded-3xl md:rounded-full z-50 bg-gradient-to-br from-white/10 via-cyan-200/10 to-white/10 backdrop-blur-xs backdrop-saturate-150 border-b border-white/20 shadow-xl bg-[length:400%_400%] animate-glass-glow transition-all duration-300"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Mobile menu - always visible at bottom */}
      <div className="md:hidden flex justify-around items-center text-white px-4 py-2 space-x-2 font-montserrat font-thin text-md">
        {NAV_LINKS.map((link) => (
          <button
            key={link.name}
            onClick={() => handleNavClick(link)}
            className="flex-1 py-2 hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded px-2 text-center"
          >
            {link.name}
          </button>
        ))}
      </div>

      {/* Desktop menu - centered at top */}
      <div className="hidden md:flex justify-center items-center text-white px-10 py-3 space-x-6 font-montserrat font-thin text-sm md:text-base">
        {NAV_LINKS.map((link) => (
          <button
            key={link.name}
            onClick={() => handleNavClick(link)}
            className="hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-transparent rounded px-2 py-1"
          >
            {link.name}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;