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
    },
    keyframes: {
      glassGlow: {
        '0%, 100%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
      },
    },
    backgroundSize: {
      '400': '400% 400%',
    },
    },
  },
};
