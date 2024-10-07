/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sunset-pink': '#FF5F6D',
        'peach': '#FFC371',
        'sky-blue': '#00C6FF',
        'ocean-blue': '#0072FF',
        'light-green': '#A8E063',
        'dark-green': '#56AB2F',
        'purple': '#DA22FF',
        'indigo': '#9733EE',
        'teal': '#00B09B',
        'lime-green': '#96C93D',
      },
    },
  },
  plugins: [],
}