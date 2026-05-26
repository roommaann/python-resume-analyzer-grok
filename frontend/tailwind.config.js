/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body:    ['DM Sans', 'sans-serif'],
      },
      colors: {
        bg:       '#0a0a0f',
        surface:  '#13131a',
        surface2: '#1c1c26',
        border:   '#2a2a3a',
        border2:  '#3a3a50',
        accent:   '#6c63ff',
        accent2:  '#a78bfa',
        muted:    '#7a7a95',
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease',
        'slide-up': 'slideUp 0.4s ease',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 },                          to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(16px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
