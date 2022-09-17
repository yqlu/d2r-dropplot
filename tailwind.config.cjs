/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    colors: {
      gray: colors.gray,
      white: colors.white,
      neutral: colors.neutral,
      regular: "white",
      magic: "#3B82F6",
      rare: "#FACC15",
      set: "#84CC16",
      unique: "#c7b377",
      rune: "#F97316",
    },
    extend: {
      fontFamily: {
        sans: "Noto Sans, Helvetica Neue, sans-serif",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
