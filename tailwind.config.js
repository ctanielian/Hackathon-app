/** @type {import('tailwindcss').Config} */
export default {
  content: ["./client/index.html", "./client/src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Merriweather'", "ui-serif", "Georgia", "serif"],
        body: ["'Mulish'", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 60px rgba(34, 34, 34, 0.12)"
      }
    }
  },
  plugins: []
};
