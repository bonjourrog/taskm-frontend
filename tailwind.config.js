/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "app-green":"#8FD4AF",
        "app-black":"#3E3E3E",
        "app-red":"#F18A73"
      }
    },
  },
  plugins: [],
}

