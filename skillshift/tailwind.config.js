module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2D6DF6',
          dark: '#1B2A4A',
          success: '#22C55E'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        code: ['Source Code Pro', 'monospace'],
        heading: ['Montserrat', 'Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
