/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "yellow": "#FFFF00",
        "secondary": "#E9F1FF",
        "white": "#FFFFFF",
        "bluelight": "#2377FC",
        "orange": "#FF5200",
        "greenlight": "#22C55E",
        "green": "#13b24d",
        "grey": "#9598AA",
        "greylight": "#F1F1F1"
      },
      fontFamily: {
        inter: ['Inter, sans-serif']
      },
      backgroundImage: {
        'banner': "url('/src/assets/banner.png')"
      }
    },
  },
  plugins: [],
}