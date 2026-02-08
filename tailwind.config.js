/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f7f7',
          100: '#b3e8e8',
          200: '#80d9d9',
          300: '#4dcaca',
          400: '#1abbbb',
          500: '#0fa0a0',
          600: '#0c7d7d',
          700: '#095a5a',
          800: '#063737',
          900: '#031414',
        },
        accent: {
          50: '#fff5e6',
          100: '#ffe0b3',
          200: '#ffcb80',
          300: '#ffb64d',
          400: '#ffa11a',
          500: '#e68a00',
          600: '#b36b00',
          700: '#804c00',
          800: '#4d2d00',
          900: '#1a0f00',
        },
        navy: {
          50: '#e8eef5',
          100: '#c2d3e3',
          200: '#9bb8d1',
          300: '#749dbf',
          400: '#4d82ad',
          500: '#1a2942',
          600: '#152135',
          700: '#101828',
          800: '#0a101b',
          900: '#05080e',
        }
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'system-ui', 'sans-serif'],
        serif: ['IBM Plex Serif', 'Georgia', 'serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
