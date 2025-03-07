module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        darkgold: '#B8860B', // Dark Goldenrod
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};