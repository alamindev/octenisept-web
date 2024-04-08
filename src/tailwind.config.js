/**
 * Tailwind CSS configuration file
 *
 * docs: https://tailwindcss.com/docs/configuration
 * default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const path = require('path')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      xxs: '375px',
      xs: '480px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1440px',
      xxl: '1720px'
    },
    extend: {
      colors: {
        dark: "#0F2D45",
        'dark-100': "#353434",
        "brand-light": "#F9F2EA",
        "brand-dark-blue": "#337EBA",
        "brand-dark-100": "#296CA2",
        "brand-accent": "#C52A51",
        "brand-accent-dark": "#AC2447",
      },
    },
    container: false
  },
  plugins: [require('tailwindcss-debug-screens')],
  important: true,
  content: [path.resolve(__dirname, '**/*.{css,js,twig}')]
}
