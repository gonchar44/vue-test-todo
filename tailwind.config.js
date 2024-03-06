/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        monospace: 'monospace',
        nunito: 'Nunito'
      }
    }
  },
  plugins: [require('@headlessui/tailwindcss')]
}
