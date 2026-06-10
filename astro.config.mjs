// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages project site: https://cmaneu.github.io/recipes
// https://astro.build/config
export default defineConfig({
  site: 'https://cmaneu.github.io',
  base: '/recipes',
  trailingSlash: 'ignore',
  vite: {
    // Cast avoids a benign type mismatch between Astro's and Tailwind's Vite versions.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
