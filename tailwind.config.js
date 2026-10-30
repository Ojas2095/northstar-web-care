/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#101B2D',
          50: '#E8EBF0',
          100: '#D1D7E1',
          200: '#A3AFC3',
          300: '#7587A5',
          400: '#4A6087',
          500: '#2D3F5A',
          600: '#1E2D43',
          700: '#162236',
          800: '#101B2D',
          900: '#0A1019',
        },
        teal: {
          DEFAULT: '#16C7B0',
          50: '#E6FAF7',
          100: '#CCF5EF',
          200: '#99EBDF',
          300: '#66E1CF',
          400: '#33D7BF',
          500: '#16C7B0',
          600: '#12A08D',
          700: '#0E796A',
          800: '#0A5247',
          900: '#062B24',
        },
        background: '#F5F7FA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
