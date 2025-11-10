/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#8B5CF6',
        'brand-secondary': '#EC4899',
        'brand-gold': '#F59E0B',
        'brand-purple': '#8B5CF6',
        'brand-pink': '#EC4899',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'responsive-xs': ['0.75rem', { lineHeight: '1rem' }],
        'responsive-sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'responsive-base': ['1rem', { lineHeight: '1.5rem' }],
        'responsive-lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'responsive-xl': ['1.25rem', { lineHeight: '1.75rem' }],
        'responsive-2xl': ['1.5rem', { lineHeight: '2rem' }],
        'responsive-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        'responsive-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        'responsive-5xl': ['3rem', { lineHeight: '1' }],
        'responsive-6xl': ['3.75rem', { lineHeight: '1' }],
        'responsive-7xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        'responsive-6': '1.5rem',
        'responsive-12': '3rem',
      },
      gridTemplateColumns: {
        'responsive-1': 'repeat(1, minmax(0, 1fr))',
        'responsive-2': 'repeat(2, minmax(0, 1fr))',
        'responsive-3': 'repeat(3, minmax(0, 1fr))',
        'responsive-4': 'repeat(4, minmax(0, 1fr))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out infinite 2s',
        'spin-slow': 'spin 8s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'slide-in-left': 'slide-in-left 0.8s ease-out',
        'slide-in-right': 'slide-in-right 0.8s ease-out',
        'slide-in-up': 'slide-in-up 0.8s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in-up': {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}