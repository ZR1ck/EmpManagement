/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blue-medium': '#007AFF',
        'blue-dark': '#3A41FF',
        'gray-medium': '#526581',
        'gray-dark': '#272D37',
        'gray-light': '#CBCBCB'
      }
    },
    fontFamily: {
      'inter': "Inter",
    }
  },
  plugins: [],
}