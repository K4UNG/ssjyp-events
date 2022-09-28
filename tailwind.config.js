/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Cormorant Garamond", "serif"],
        caudex: ["Caudex", "serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        br: "#CECECE",
        body: "#F2F2F2",
        accent: "#34C2E1",
      },
    },
  },
  plugins: [],
};
