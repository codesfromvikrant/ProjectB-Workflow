/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      colors: {
        'primary': '#101011',
        'secondary': '#1e1e1e',
        'blureffect': '#ffffff11',
        'textcolor': '#7b7c7d',
        'bgblack': '#00000043',
      },
    },
  },
  plugins: [],
}

