/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        hero: {
          bg: '#00B890',        // Main vibrant teal for solid stripes
          text: '#D6FFF7',      // Light mint text for contrast
          faded: 'rgba(0, 184, 144, 0.4)',  // 40% opacity version for light/faded stripes
          dark: '#008C70',      // Darker hover/active shade
          light: '#3FFFD9',     // Lighter tint for subtle accents
        },
        tiffany: {
          DEFAULT: '#00B890',
          dark: '#008C70',
          light: '#D6FFF7',
        },
        crave: {
          gray: '#F8FAFC',
          dark: '#1E293B',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 184, 144, 0.15)',
        'card': '0 10px 25px rgba(0, 0, 0, 0.08)',
        'hover': '0 20px 40px rgba(0, 184, 144, 0.25)',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}