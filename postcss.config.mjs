/**
 * Tailwind CSS 4 runs as a PostCSS plugin here.
 * (The Vite plugin needs a matching Vite version; PostCSS keeps the setup
 * stable across Astro releases while producing the same CSS.)
 */
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
