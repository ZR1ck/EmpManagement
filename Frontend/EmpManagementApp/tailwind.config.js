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
      'notoSerif': "Noto Serif",
      'inter': "Inter",
      'poppins': "Poppins"
    },
    boxShadow: {
      'around': '0 0 4px 2px rgba(0, 0, 0, 0.1)',
    }
  },
  plugins: [],
}