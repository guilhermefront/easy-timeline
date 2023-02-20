/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        DEFAULT: '#EBEBEB',
        input: '#EFF0F2',
      },
      textColor: {
        DEFAULT: '#1E1E1E',
        placeholder: '#838383',
      },
      colors: {
        label: '#4D5959',
        primary: '#566963',
        ['primary-dark']: '#485853',
        title: '#271510',
      },
      borderColor: {
        DEFAULT: '#BCBCBC',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
    },
  },
  plugins: [],
};
