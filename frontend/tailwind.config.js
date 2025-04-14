/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        float: 'float 6s ease-in-out infinite',
        moveText: 'moveText 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)',
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(2deg)',
          },
        },
        moveText: {
          '0%': { 
            transform: 'translateX(100vw)',
          },
          '100%': { 
            transform: 'translateX(-100%)',
          },
        },
      },
      fontFamily: {
        barlow: ['Barlow Condensed', 'sans-serif']
      }
    },
  },
  plugins: [],
}