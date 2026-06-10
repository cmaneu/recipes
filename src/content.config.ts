import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Recipes are plain Markdown files (no front matter) that already live in the
 * repository so they stay browsable directly on GitHub. We load them in place from
 * the per-language subfolders of the three category folders
 * (e.g. `plats/en/carbonara.md`, `plats/fr/carbonara.md`).
 */
const recipes = defineCollection({
  loader: glob({
    pattern: '{snacks,plats,patisserie}/{en,fr}/*.md',
    base: '.',
  }),
});

export const collections = { recipes };
