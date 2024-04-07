/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      nunito: ["Poppins", "sans-serif"],
    },
    screens: {
      xxs: "375px",
      xs: "480px",
      sm: "768px",
      md: "992px",
      lg: "1200px",
      xl: "1440px",
      xxl: "1720px",
    },
    extend: {
      colors: {
        dark: "#0F2D45",
        "brand-light": "#F9F2EA",
        "brand-dark-blue": "#337EBA",
        "brand-accent": "#C52A51",
      },
    },
    container: false,
  },
  plugins: [],
};
