/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'glass-glow': 'glassGlow 6s ease-in-out infinite',
        // Nuova animazione per l'entrata fluida stile Apple
        'liquid-entrance': 'liquid-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        glassGlow: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        // Keyframes per l'effetto "discesa e comparsa"
        'liquid-entrance': {
          '0%': { 
            transform: 'translate(-50%, -20px) scale(0.95)', 
            opacity: '0' 
          },
          '100%': { 
            transform: 'translate(-50%, 0) scale(1)', 
            opacity: '1' 
          },
        },
      },
      backgroundSize: {
        '400': '400% 400%',
      },
      // Utilità extra per sfocature molto leggere (opzionale)
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};


