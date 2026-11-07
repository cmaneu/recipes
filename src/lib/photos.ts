import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';
import { categoryOf, slugOf, type Recipe } from './recipes';

/**
 * Recipe photos live next to the recipes, as `<category>/<slug>.<ext>`
 * (e.g. `plats/pad-thai.jpg`), and are shared by every translation.
 */
const files = import.meta.glob<ImageMetadata>(
  '/{snacks,plats,patisserie,inbox}/*.{jpg,jpeg,png,webp}',
  { eager: true, import: 'default' },
);

const localPhotos = new Map(
  Object.entries(files).map(([path, image]) => {
    const [, category, file] = path.split('/');
    return [`${category}/${file.replace(/\.[^.]+$/, '')}`, image] as const;
  }),
);

/** First remote image referenced in the recipe markdown, if any. */
function remotePhotoOf(recipe: Recipe): string | undefined {
  return recipe.body?.match(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/)?.[1];
}

/**
 * Returns an optimized photo URL for a recipe at the given width, falling back
 * to a remote image linked in its markdown. Returns `undefined` when the recipe
 * has no photo at all.
 */
export async function photoOf(recipe: Recipe, width: number): Promise<string | undefined> {
  const local = localPhotos.get(`${categoryOf(recipe)}/${slugOf(recipe)}`);
  if (local) {
    return (await getImage({ src: local, width: Math.min(width, local.width), format: 'webp', quality: 80 })).src;
  }
  return remotePhotoOf(recipe);
}
