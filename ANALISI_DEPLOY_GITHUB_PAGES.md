# Analisi: Deploy su GitHub Pages - Asset Non Caricano

## Diagnosi del Problema

Con `basename="/My-portfolio/"` in BrowserRouter e `base: '/My-portfolio/'` in vite.config.ts, il sito vive a:
```
https://gmorelli.github.io/My-portfolio/
```

## 1. Configurazione Base Path

### ✅ Corretto
- **main.tsx** (riga 8): `<BrowserRouter basename="/My-portfolio/">`
- **vite.config.ts** (riga 9): `base: '/My-portfolio/'`

React Router è consapevole del basename, quindi i link interni vengono gestiti correttamente.

---

## 2. Il Problema Critico: Percorsi Assoluti nel JSX

### ❌ PROBLEMA: Home.tsx (riga 20)
```tsx
<img src="/images/me.svg" alt="" />
```

**Cosa succede:**
- Nel browser, questo URL assoluto `/images/me.svg` viene interpretato come:
  ```
  https://gmorelli.github.io/images/me.svg  (❌ SBAGLIATO)
  ```
- Dovrebbe essere:
  ```
  https://gmorelli.github.io/My-portfolio/images/me.svg  (✅ CORRETTO)
  ```

**Perché succede:**
Vite con `base: '/My-portfolio/'` trasforma i percorsi negli **asset CSS/HTML**, ma i percorsi hardcodati come **stringhe nel JSX/TS non vengono rewritten**. Rimangono come scritti nel codice sorgente.

---

## 3. Immagini dei Progetti: constants/index.ts

### ❌ PROBLEMA: Tutte le immagini (righe 10, 22, 34)
```ts
image: '/images/cd.jpeg',
image: '/images/ft_t.png',
image: '/images/ascom.png',
```

Stesso problema della immagine hero. Questi riferimenti rimangono assoluti e vanno a cercare in `https://gmorelli.github.io/images/` anziché `https://gmorelli.github.io/My-portfolio/images/`.

---

## 4. Font: styles.css

### ✅ CORRETTO (ma da verificare nel build)
```css
@font-face {
    src: url('/font/static/Montserrat-Regular.ttf') format('truetype');
}
```

Vite dovrebbe trasformare questo durante la build in `/My-portfolio/font/static/...`. Tuttavia, dipende se il CSS viene correttamente processato da Vite.

**⚠️ Cosa verificare:** Nella cartella `/dist` dopo il build, controllare se i URL nel CSS sono stati rewritten con il base path.

---

## 5. Link Navbar: Navbar.tsx

### ✅ CORRETTO
- Link interni come `href="/"` vengono gestiti da React Router e convertiti in `/#` con il basename
- Link scroll tipo `href="projects"` rimangono corretti con l'ID
- I link esterni rimangono unchanged

---

## 6. Riferimenti in index.html

### ✅ CORRETTO
```html
<link href="/src/styles/styles.css" rel="stylesheet">
<script type="module" src="/src/main.tsx"></script>
```

Vite riscrive questi durante la build nel bundle finale, quindi rimangono corretti.

---

## Riepilogo dei Problemi

| File | Elemento | Problema | Impatto |
|------|----------|----------|--------|
| Home.tsx | `src="/images/me.svg"` | Percorso assoluto non rewritten | ❌ Immagine hero non carica |
| constants/index.ts | `image: '/images/*.{jpeg,png}'` | Percorsi assoluti non rewritten | ❌ Immagini progetti non caricano |
| styles.css | `url('/font/static/...')` | Dipende da Vite processing | ⚠️ Font potrebbero non caricarsi |
| Navbar.tsx | Link interni | Usano React Router (basename-aware) | ✅ Funzionano correttamente |

---

## Cause Tecniche

### Percorsi Assoluti nel JSX/TS
```tsx
// Questo rimane così nel bundle:
<img src="/images/me.svg" />

// Vite NON rewrite le stringhe hardcodated
```

### Percorsi nei CSS/HTML
```css
/* Vite REWRITE questo: */
@font-face { src: url('/font/...') }

/* Diventando: */
@font-face { src: url('/My-portfolio/font/...') }
```

---

## Impatto sul Deploy

**Su `http://localhost:5173/` (dev locale):**
- `/images/me.svg` → `http://localhost:5173/images/me.svg` ✅ Funziona

**Su `https://gmorelli.github.io/My-portfolio/` (GitHub Pages):**
- `/images/me.svg` → `https://gmorelli.github.io/images/me.svg` ❌ Non esiste
- Dovrebbe essere → `https://gmorelli.github.io/My-portfolio/images/me.svg`

---

## Soluzioni Possibili

1. **Usare percorsi relativi** (Raccomandato)
   ```tsx
   <img src="./images/me.svg" /> // Relativo al documento
   ```

2. **Importare immagini come moduli** (Best Practice in Vite)
   ```tsx
   import meImage from '../../../public/images/me.svg'
   <img src={meImage} />
   ```

3. **Prefissare manualmente con basename**
   ```tsx
   <img src={`/My-portfolio/images/me.svg`} />
   // Non consigliato: hardcoding del basename
   ```

4. **Usare una variabile d'ambiente per il base path**
   ```tsx
   <img src={`${import.meta.env.BASE_URL}images/me.svg`} />
   // Soluzione più robusta
   ```
