/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          500: '#00B4FF'
        },
        purple: {
          600: '#7B2FFF'
        },
        pink: {
          500: '#FF2D78'
        },
        gray: {
          50: '#F5F7FA',
          900: '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif']
      },
      borderRadius: {
        '2xl': '16px'
      }
    }
  },
  plugins: []
}
