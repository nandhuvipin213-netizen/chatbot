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
        chatBg: {
          light: '#f8fafc',
          dark: '#0f172a',
        },
        sidebarBg: {
          light: '#f1f5f9',
          dark: '#090d16',
        },
        panelBg: {
          light: '#ffffff',
          dark: '#1e293b',
        },
      },
    },
  },
  plugins: [],
}

