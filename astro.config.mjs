// @ts-check
import { defineConfig } from 'astro/config';

// Deployed as a GitHub Pages project site: https://cmaneu.github.io/recipes
// https://astro.build/config
export default defineConfig({
  site: 'https://cmaneu.github.io',
  base: '/recipes',
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    routing: {
      // The language is always present in the path (e.g. /en, /fr). The site
      // root redirects to the default locale (see src/pages/index.astro).
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
});
