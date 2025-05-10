/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  safelist: [
    'btn',
    'btn-primary',
    'btn-secondary',
    'btn-accent',
    'btn-outline',
    'input-field',
    'form-group',
    'form-label',
    'form-error',
    'container-custom',
    'card',
    'section',
    'section-title'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // Базовые цвета
        background: '#FFFFFF', // основной фон
        text: '#333333', // основной цвет текста
        // Акцентные цвета
        primary: {
          DEFAULT: '#3B7DD3', // синий акцент
          light: '#4A89DC',
          dark: '#2C71C9',
        },
        accent: {
          DEFAULT: '#E0704A', // терракота
          light: '#E57E5A',
          dark: '#DB613A',
        },
        success: {
          DEFAULT: '#2EAF8E',
          light: '#37BC9B',
          dark: '#25A282',
        },
        neutral: {
          100: '#F9F9F9',
          200: '#F2F2F2',
          300: '#E6E6E6',
          400: '#CCCCCC',
          500: '#999999',
          600: '#666666',
          700: '#333333',
        },
        terracotta: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        dark: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      backgroundImage: {
        'hero-pattern': "url('/images/hero-bg.jpg')",
        'pattern-uzbek': "url('/images/uzbek-pattern.jpg')",
      },
      boxShadow: {
        'card': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 20px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
  corePlugins: {
    preflight: true,
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    options: {
      safelist: [
        'btn',
        'btn-primary',
        'btn-secondary',
        'btn-accent',
        'btn-outline',
        'input-field',
        'form-group',
        'form-label',
        'form-error',
        'container-custom',
        'card',
        'section',
        'section-title'
      ]
    }
  }
};
