/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'dwapor': {
          'charcoal': '#ffffff',          // Pure white (background)
          'espresso': '#f8f8f8',          // Light gray-white (background)
          'beige': '#2a2a2a',             // Dark gray (text)
          'parchment': '#000000',         // Pure black (text)
          'ivory': '#f5f5f5',             // Off-white (background)
          'soft-gray': '#666666',         // Medium gray (text)
          'warm-brown': '#e8e8e8',        // Light gray (background)
          'gold': '#000000',              // Black (main accent text)
          'museum': '#ffffff',            // Pure white (background)
          'amber': '#1a1a1a',             // Dark gray (secondary accent text)
          'crimson': '#000000',           // Black
          'ruby': '#000000',              // Black  
          'burgundy': '#cccccc',          // Light gray (background)
          'rose': '#333333',              // Dark gray (text)
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['5.5rem', { lineHeight: '1.05' }],
        'section': ['3rem', { lineHeight: '1.1' }],
        'display': ['4rem', { lineHeight: '1.1' }],
      },
      backdropBlur: {
        '18': '18px',
      },
      letterSpacing: {
        'wide': '0.05em',
        'tighter': '-0.02em',
        'widest': '0.1em',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      }
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};