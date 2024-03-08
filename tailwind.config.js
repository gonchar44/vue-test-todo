/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          main: '#f0e1d8',
          dark: '#2a2c2e',
          light: '#e0e0e0',
          success: '#6fde80'
        },
        secondary: {
          main: '#ff6054',
          dark: '#878787',
          light: '#c9be67'
        }
      },
      fontFamily: {
        monospace: 'monospace',
        nunito: 'Nunito'
      }
    }
  },
  plugins: [require('@headlessui/tailwindcss')]
}
