/**
 * Lingua del sito, decisa una volta al caricamento: parametro ?lang= →
 * scelta salvata → lingua del browser. Cambiarla ricarica la pagina (vedi il
 * selettore in Navbar), quindi non serve nessun context React.
 */
export type Lang = 'it' | 'en';

const isLang = (value: string | null): value is Lang => value === 'it' || value === 'en';

function detect(): Lang {
  const param = new URLSearchParams(window.location.search).get('lang');
  let stored: string | null = null;
  try {
    if (isLang(param)) localStorage.setItem('lang', param);
    stored = localStorage.getItem('lang');
  } catch {
    // Storage bloccato (navigazione privata): si decide senza scelta salvata.
  }
  if (isLang(param)) return param;
  if (isLang(stored)) return stored;
  return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
}

export const lang: Lang = detect();

/** Sceglie tra il testo italiano e quello inglese: `L('Progetti', 'Projects')`. */
export const L = <T,>(it: T, en: T): T => (lang === 'en' ? en : it);

// L'HTML statico è in italiano: in inglese si allineano lingua, titolo e descrizione.
document.documentElement.lang = lang;
if (lang === 'en') {
  document.title = 'Giovanni Morelli | Software developer';
  document
    .querySelector('meta[name="description"]')
    ?.setAttribute(
      'content',
      'Giovanni Morelli, software developer based in Florence. Trained at 42 Firenze, with a real passion for frontend: fast, carefully crafted web interfaces.',
    );
}
