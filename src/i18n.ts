/**
 * Internationalization helpers. The site supports English (default) and French,
 * with the active language carried in the URL path (e.g. `/en/...`, `/fr/...`).
 */

/** Supported locales. The first one is the default. */
export const LOCALES = ['en', 'fr'] as const;

export type Locale = (typeof LOCALES)[number];

/** Default locale used when none is specified (e.g. at the site root). */
export const DEFAULT_LOCALE: Locale = 'en';

/** Native name of each locale, used in the language switcher. */
export const LOCALE_NAMES: Record<Locale, string> = {
  en: 'English',
  fr: 'Français',
};

/** Type guard narrowing an arbitrary string to a supported {@link Locale}. */
export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}

/** Localized UI strings (everything outside the recipe markdown itself). */
export const UI = {
  en: {
    htmlLang: 'en',
    siteTitle: 'recipes — cmaneu',
    metaDescription: 'My recipes, on the command line.',
    tagline: (count: number) =>
      `My recipes (and the ones I pinched). ${count} recipes on the menu.`,
    listPath: '~/recipes',
    listCommand: 'ls -R',
    catCount: (label: string, count: number) => `# ${label} (${count})`,
    catCommand: (file: string) => `cat ${file}`,
    cdUp: 'cd ..',
    backToList: '← back to the list',
    viewOnGitHub: 'view on GitHub',
    recipeMeta: (title: string) => `Recipe: ${title}`,
    switchLanguage: 'Language',
  },
  fr: {
    htmlLang: 'fr',
    siteTitle: 'recipes — cmaneu',
    metaDescription: 'Mes recettes de cuisine, en ligne de commande.',
    tagline: (count: number) =>
      `Mes recettes (et celles que j'ai chipées). ${count} recettes au menu.`,
    listPath: '~/recipes',
    listCommand: 'ls -R',
    catCount: (label: string, count: number) => `# ${label} (${count})`,
    catCommand: (file: string) => `cat ${file}`,
    cdUp: 'cd ..',
    backToList: '← retour à la liste',
    viewOnGitHub: 'voir sur GitHub',
    recipeMeta: (title: string) => `Recette : ${title}`,
    switchLanguage: 'Langue',
  },
} satisfies Record<Locale, Record<string, unknown>>;

/** Returns the UI strings for the given locale. */
export function t(locale: Locale) {
  return UI[locale];
}
