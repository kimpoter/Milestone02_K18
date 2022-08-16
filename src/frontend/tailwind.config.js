/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Prompt'],
      },
      colors: {
        'primary': '#1C2540',
        'secondary': '#243E73',
        'greyscale': '#EFEFEF',
      },
    },
  },
  plugins: [],
};