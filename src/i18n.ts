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
    siteTitle: 'recipes — cmaneu',
    metaDescription: 'My recipes, and a few borrowed favorites.',
    skipToContent: 'Skip to content',
    mainNav: 'Main navigation',
    navRecipes: 'Recipes',
    toggleTheme: 'Toggle color theme',
    switchLanguage: 'Language',
    noTranslation: 'No translation available',
    footerAbout: 'My recipes, and a few borrowed ones. By Christopher Maneu.',
    footerGitHub: 'The notebook on GitHub ↗',
    eyebrow: 'The notebook',
    heading: 'Find your next recipe.',
    intro: 'My recipes and a few borrowed favorites.',
    categories: 'Categories',
    all: 'All',
    searchLabel: 'Search recipes',
    searchPlaceholder: 'A dish, an ingredient in the title…',
    /** `{visible}` and `{total}` are replaced client-side while filtering. */
    statusTemplate: '{visible} of {total} recipes shown',
    emptyState: 'No recipes found. Try another title or category.',
    readRecipe: 'Read the recipe →',
    allRecipes: '← All recipes',
    breadcrumb: 'Breadcrumb',
    jumpToIngredients: 'Jump to ingredients ↓',
    jumpToRecipe: 'Jump to the recipe ↓',
    print: 'Print',
    inThisRecipe: 'In this recipe',
    recipeSections: 'Recipe sections',
    viewOnGitHub: 'View on GitHub →',
    recipeMeta: (title: string) => `Recipe: ${title}`,
  },
  fr: {
    siteTitle: 'recipes — cmaneu',
    metaDescription: "Mes recettes, et celles que j'ai chipées.",
    skipToContent: 'Aller au contenu',
    mainNav: 'Navigation principale',
    navRecipes: 'Les recettes',
    toggleTheme: 'Changer le thème',
    switchLanguage: 'Langue',
    noTranslation: 'Pas de traduction disponible',
    footerAbout: "Mes recettes, et celles que j'ai chipées. Par Christopher Maneu.",
    footerGitHub: 'Le carnet sur GitHub ↗',
    eyebrow: 'Le carnet',
    heading: 'Quelle recette choisir ?',
    intro: 'Mes recettes et quelques emprunts.',
    categories: 'Catégories',
    all: 'Tout',
    searchLabel: 'Rechercher une recette',
    searchPlaceholder: 'Un plat, un ingrédient dans le titre…',
    statusTemplate: '{visible} recettes affichées sur {total}',
    emptyState: 'Aucune recette trouvée. Essayez un autre titre ou une autre catégorie.',
    readRecipe: 'Lire la recette →',
    allRecipes: '← Toutes les recettes',
    breadcrumb: "Fil d'Ariane",
    jumpToIngredients: 'Voir les ingrédients ↓',
    jumpToRecipe: 'Voir la recette ↓',
    print: 'Imprimer',
    inThisRecipe: 'Dans cette recette',
    recipeSections: 'Sections de la recette',
    viewOnGitHub: 'Voir sur GitHub →',
    recipeMeta: (title: string) => `Recette : ${title}`,
  },
} satisfies Record<Locale, Record<string, unknown>>;

/** Returns the UI strings for the given locale. */
export function t(locale: Locale) {
  return UI[locale];
}
