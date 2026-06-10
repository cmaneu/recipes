import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n';

export type Recipe = CollectionEntry<'recipes'>;

export interface Category {
  /** Folder name used as the collection id prefix. */
  dir: string;
  /** Human readable label shown in the UI, per locale. */
  label: Record<Locale, string>;
}

/** Display order and localized labels for the recipe categories. */
export const CATEGORIES: Category[] = [
  { dir: 'snacks', label: { en: 'Starters', fr: 'Entrées' } },
  { dir: 'plats', label: { en: 'Mains', fr: 'Plats' } },
  { dir: 'patisserie', label: { en: 'Desserts & sweets', fr: 'Desserts & sucré' } },
];

/** Returns the localized label of a category for the given locale. */
export function categoryLabel(dir: string, locale: Locale): string {
  return CATEGORIES.find((c) => c.dir === dir)?.label[locale] ?? dir;
}

/**
 * Recipe ids look like `plats/en/carbonara`, i.e.
 * `<category>/<locale>/<slug>`.
 */

/** Returns the category folder of a recipe (e.g. `plats`). */
export function categoryOf(recipe: Recipe): string {
  return recipe.id.split('/')[0];
}

/** Returns the locale of a recipe (e.g. `en`). */
export function localeOf(recipe: Recipe): Locale {
  return recipe.id.split('/')[1] as Locale;
}

/** Returns the slug (file name without extension) of a recipe. */
export function slugOf(recipe: Recipe): string {
  return recipe.id.split('/').slice(2).join('/');
}

/**
 * Extracts the recipe title from its first level-one Markdown heading, falling
 * back to a humanized version of the file name when none is present.
 */
export function titleOf(recipe: Recipe): string {
  const heading = recipe.body?.match(/^#\s+(.+?)\s*$/m);
  if (heading) return heading[1].trim();

  const slug = slugOf(recipe) || recipe.id;
  return slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Path (relative to the site base) of a recipe page: `<locale>/<category>/<slug>`. */
export function recipePath(recipe: Recipe): string {
  return `${localeOf(recipe)}/${categoryOf(recipe)}/${slugOf(recipe)}`;
}

/**
 * Recipes for a given locale, grouped by category and sorted alphabetically by
 * title within each group.
 */
export async function getRecipesByCategory(
  locale: Locale,
): Promise<Array<Category & { recipes: Array<{ recipe: Recipe; title: string }> }>> {
  const all = await getCollection('recipes');

  return CATEGORIES.map((category) => {
    const recipes = all
      .filter(
        (recipe) =>
          categoryOf(recipe) === category.dir && localeOf(recipe) === locale,
      )
      .map((recipe) => ({ recipe, title: titleOf(recipe) }))
      .sort((a, b) => a.title.localeCompare(b.title, locale));

    return { ...category, recipes };
  }).filter((category) => category.recipes.length > 0);
}
