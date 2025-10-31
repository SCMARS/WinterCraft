/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'snow-white': '#ffffff',
        'snow-white-soft': '#f0f5ff',
        'frost-blue': '#cfe9ff',
        'frost-blue-dark': '#a0c8e0',
        'ice-blue': '#a6d3ff',
        'ice-blue-dark': '#7ab0e6',
        'ice-blue-light': '#d1e8ff',
        'christmas-red': '#e84141',
        'christmas-red-dark': '#c93030',
        'gold': '#f5d76e',
        'gold-dark': '#e6c44d',
        'midnight': '#0d1b2a',
        'midnight-light': '#1a2c42',
        'midnight-dark': '#071525',
        'aurora-green': '#7be0ad',
        'aurora-purple': '#b892ff',
        'aurora-pink': '#ff9fb2',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'snow-fall': 'snowfall 10s linear infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'blink': 'blink 1.5s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in',
        'float': 'float 6s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'slide-in-right': 'slideInRight 0.5s ease-out',
        'slide-in-left': 'slideInLeft 0.5s ease-out',
        'slide-in-up': 'slideInUp 0.5s ease-out',
      },
      keyframes: {
        snowfall: {
          '0%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(166, 211, 255, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(166, 211, 255, 0.8)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        float: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-500px 0' },
          '100%': { backgroundPosition: '500px 0' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideInUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
      },
      boxShadow: {
        'frost': '0 4px 14px 0 rgba(166, 211, 255, 0.3)',
        'frost-lg': '0 10px 25px -5px rgba(166, 211, 255, 0.4)',
        'inner-frost': 'inset 0 2px 4px 0 rgba(166, 211, 255, 0.2)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'frost-gradient': 'linear-gradient(to right, #a6d3ff, #cfe9ff, #a6d3ff)',
        'aurora-gradient': 'linear-gradient(to right, #7be0ad, #b892ff, #ff9fb2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backdropBlur: {
        'xs': '2px',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: '#cfe9ff',
            h1: {
              color: '#ffffff',
            },
            h2: {
              color: '#ffffff',
            },
            h3: {
              color: '#ffffff',
            },
            strong: {
              color: '#ffffff',
            },
            a: {
              color: '#a6d3ff',
              '&:hover': {
                color: '#ffffff',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
}
