const typography = require('@tailwindcss/typography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
        serif: ["Lora", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        // Keep existing blue utility classes on the shared Health & Travels palette.
        blue: {
          50: '#EEF8F5', 100: '#DBEEE8', 200: '#B8D9D2',
          300: '#8BBDB2', 400: '#579B8D', 500: '#287F70',
          600: '#00695C', 700: '#005A4F', 800: '#004D40',
          900: '#003D33', 950: '#002B24',
        },
        brand: {
          primary: '#00695C',
          dark: '#004D40',
          accent: '#00695C',
          sage: '#B8D9D2',
          mist: '#EEF8F5',
          ivory: '#FBFAF7',
          ink: '#1F2937',
          terracotta: '#B85C38',
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [typography],
};
