import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Recipes are plain Markdown files (no front matter) that already live in the
 * repository so they stay browsable directly on GitHub. We load them in place from
 * the three category folders.
 */
const recipes = defineCollection({
  loader: glob({
    pattern: '{snacks,plats,patisserie}/*.md',
    base: '.',
  }),
});

export const collections = { recipes };
