import type { NavLink as NavLinkType } from '../types';
import { NAV_LINKS, SECTION_IDS } from '../constants';
import { useScrollListener } from '../hooks/useScrollListener';
import { useActiveSection } from '../hooks/useActiveSection';
import { L } from '../i18n';

function Navbar() {
  const scrolled = useScrollListener(40);
  const active = useActiveSection(SECTION_IDS);

  const item = (link: NavLinkType) => {
    const isActive = active === link.href;
    return (
      <a
        key={link.name}
        href={`#${link.href}`}
        aria-current={isActive ? 'true' : undefined}
        className={`relative rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
          isActive ? 'text-white' : 'text-muted hover:text-white'
        }`}
      >
        {/* Pillola dell'elemento attivo, sotto al testo */}
        {isActive && (
          <span
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-white/15 shadow-[inset_0_1px_0_rgb(255_255_255/0.35),0_2px_8px_rgb(0_0_0/0.25)]"
          />
        )}
        {link.name}
      </a>
    );
  };

  return (
    <>
      {/* Selettore lingua: tondo nell'angolo, stesso posto su desktop e mobile.
          Mostra la lingua verso cui si passa; il link ricarica la pagina (vedi i18n.ts) */}
      <a
        href={`?lang=${L('en', 'it')}`}
        aria-label={L('Switch to English', 'Passa all’italiano')}
        className="liquid-glass fixed right-5 top-5 z-50 flex h-11 w-11 items-center justify-center rounded-full font-mono text-xs text-muted transition-colors duration-300 hover:text-white"
      >
        {L('EN', 'IT')}
      </a>

      {/* Desktop — pillola in alto */}
      <nav
        className={`liquid-glass fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 rounded-full
          transition-all duration-500 md:block
          ${scrolled ? 'px-2 py-1.5' : 'px-3 py-2'}`}
        role="navigation"
        aria-label={L('Navigazione principale', 'Main navigation')}
      >
        <div className="flex items-center gap-1">{NAV_LINKS.map(item)}</div>
      </nav>

      {/* Mobile — tab bar in basso, dove arriva il pollice */}
      <nav
        className="liquid-glass fixed inset-x-4 bottom-4 z-50 rounded-full md:hidden"
        role="navigation"
        aria-label={L('Navigazione principale', 'Main navigation')}
      >
        <div className="flex items-center justify-around px-2 py-2">{NAV_LINKS.map(item)}</div>
      </nav>
    </>
  );
}

export default Navbar;
