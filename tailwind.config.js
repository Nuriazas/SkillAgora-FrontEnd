/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
    theme: {
    extend: {
      colors: {
        lightCyan: '#A7F3D0',
        lightBlue: '#BFDBFE',
        darkCyan: '#064E3B',
        darkBlue: '#1E3A8A',
      },
    },
  },
  plugins: [],
};