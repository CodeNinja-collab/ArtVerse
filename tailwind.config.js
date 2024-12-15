/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      colors: {
        primary: {
          DEFAULT: '#FF6B6B',
          hover: '#FF5252',
        },
        secondary: {
          DEFAULT: '#4ECDC4',
          hover: '#45B7AF',
        },
        accent: {
          yellow: '#FFE66D',
          purple: '#6C5CE7',
          pink: '#FF78CB',
          blue: '#45AAF2',
        },
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
}