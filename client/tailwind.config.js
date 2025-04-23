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
        'crypto-green': '#10b981', // Pour les transactions d'achat
        'crypto-red': '#ef4444',   // Pour les transactions de vente
        'crypto-bg': '#0f172a',
        'crypto-card': '#1e293b',
      },
    },
  },
  plugins: [],
}