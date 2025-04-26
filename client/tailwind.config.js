/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'crypto-primary': '#2563eb',
        'crypto-secondary': '#1e40af',
        'crypto-green': '#10b981', // For buy transactions
        'crypto-red': '#ef4444',   // For sell transactions
        'crypto-bg': '#0f172a',
        'crypto-card': '#1e293b',
      },
    },
  },
  plugins: [],
}