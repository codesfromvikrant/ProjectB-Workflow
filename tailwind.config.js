/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'primary': '#13131A',
        'secondary': '#1C1C24',
        'blureffect': '#ffffff11',
        'textcolor': '#7b7c7d',
        'bgblack': '#00000043',
        'glassyblue': '#2564eb68',
        'glassyred': '#dc262662',
      },
    },
  },
  plugins: [],
}

