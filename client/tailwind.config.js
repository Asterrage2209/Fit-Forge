/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'brand': {
          'light': '#a7f3d0',     // Light Bluish-Green (emerald-200)
          'light-alt': '#6ee7b7', // A slightly darker shade (emerald-300) - NEW
          'DEFAULT': '#14b8a6',   // Default Bluish-Green (teal-500)
          'dark': '#115e59',      // Darkish Green (teal-900)
          'dark-alt': '#1e293b'    // A slightly lighter shade for dark mode UI (teal-800) - NEW
        },
      },
    },
  },
  plugins: [],
}