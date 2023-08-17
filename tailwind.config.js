/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'primary': '#161616',
        'secondary': '#1E1E1E',
        'blureffect': '#ffffff19',
      },
    },
  },
  plugins: [],
}

