/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',
          navy: '#1e3a8a',
          cyan: '#00b4d8',
          'cyan-hover': '#0096c7',
          magenta: '#e11d48',
          yellow: '#facc15',
          gold: '#eab308',
          accent: '#0284c7',
        },
        giv: {
          yellow: '#ffdd00',
          yellowDark: '#e6c700',
          dark: '#1a1a1a',
          purple: '#651bac',
          gray: '#f5f5f7',
          border: '#e5e7eb',
        }
      },
      fontFamily: {
        sans: ['Sarabun', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.06), 0 1px 4px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
        'glow-cyan': '0 0 20px -3px rgba(0, 180, 216, 0.35)',
        'glow-yellow': '0 0 20px -3px rgba(250, 204, 21, 0.45)',
      }
    },
  },
  plugins: [],
}
