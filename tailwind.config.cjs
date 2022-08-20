/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Segoe UI, Helvetica Neue, sans-serif",
      },
    },
  },
  plugins: [],
};
