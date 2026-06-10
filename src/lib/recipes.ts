import { getCollection, type CollectionEntry } from 'astro:content';

export type Recipe = CollectionEntry<'recipes'>;

export interface Category {
  /** Folder name used as the collection id prefix. */
  dir: string;
  /** Human readable label shown in the UI. */
  label: string;
}

/** Display order and labels for the recipe categories. */
export const CATEGORIES: Category[] = [
  { dir: 'snacks', label: 'Entrées' },
  { dir: 'plats', label: 'Plats' },
  { dir: 'patisserie', label: 'Desserts & sucré' },
];

/** Returns the category folder of a recipe (e.g. `plats`). */
export function categoryOf(recipe: Recipe): string {
  return recipe.id.split('/')[0];
}

/**
 * Extracts the recipe title from its first level-one Markdown heading, falling
 * back to a humanized version of the file name when none is present.
 */
export function titleOf(recipe: Recipe): string {
  const heading = recipe.body?.match(/^#\s+(.+?)\s*$/m);
  if (heading) return heading[1].trim();

  const slug = recipe.id.split('/').pop() ?? recipe.id;
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Recipes grouped by category, sorted alphabetically by title within each group. */
export async function getRecipesByCategory(): Promise<
  Array<Category & { recipes: Array<{ recipe: Recipe; title: string }> }>
> {
  const all = await getCollection('recipes');

  return CATEGORIES.map((category) => {
    const recipes = all
      .filter((recipe) => categoryOf(recipe) === category.dir)
      .map((recipe) => ({ recipe, title: titleOf(recipe) }))
      .sort((a, b) => a.title.localeCompare(b.title, 'fr'));

    return { ...category, recipes };
  }).filter((category) => category.recipes.length > 0);
}
