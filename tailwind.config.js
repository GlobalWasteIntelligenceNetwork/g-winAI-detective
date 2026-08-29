/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gwin: {
          50: '#f0f7f4',
          100: '#dc ede4',
          200: '#bddcc9',
          300: '#8fc3a6',
          400: '#5ba37d',
          500: '#3c8762',
          600: '#2c6b4d',
          700: '#245540',
          800: '#1f4534',
          900: '#1a382b',
          950: '#0d2118',
        },
        neutral: {
          50: '#f8faf9',
          100: '#f1f4f2',
          200: '#e6ebe8',
          300: '#d2dad5',
          400: '#aebbb3',
          500: '#86968c',
          600: '#6b7a71',
          700: '#55625b',
          800: '#454f4a',
          900: '#3a423e',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(15, 33, 24, 0.06), 0 1px 2px rgba(15, 33, 24, 0.04)',
        'card-hover': '0 4px 12px rgba(15, 33, 24, 0.08), 0 2px 4px rgba(15, 33, 24, 0.04)',
      },
    },
  },
  plugins: [],
};
