/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brown: '#38261e',
        orange: '#ff9700',
        background: '#eadbd6'
      },
      fontSize: {
        'heading-lg': '2.0rem',
        'heading-md': '1.5rem', 
        'heading-sm': '1.25rem', 
      },
    },
  },
  plugins: [],
}

