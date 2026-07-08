import type { Language, Translation } from './types';

const cache: Partial<Record<Language, Translation>> = {};

type LocaleModule = { default: Translation };

const loaders: Record<Language, () => Promise<LocaleModule>> = {
  es: () => import('./locales/es') as Promise<LocaleModule>,
  en: () => import('./locales/en') as Promise<LocaleModule>,
};

export async function loadTranslation(lang: Language): Promise<Translation> {
  if (cache[lang]) return cache[lang]!;
  const mod = await loaders[lang]();
  cache[lang] = mod.default;
  return mod.default;
}

export function getTranslationSync(lang: Language): Translation {
  const dict = cache[lang];
  if (!dict) {
    throw new Error(`Translation "${lang}" is not loaded yet`);
  }
  return dict;
}

export function isTranslationLoaded(lang: Language): boolean {
  return Boolean(cache[lang]);
}

/** Precarga ambos idiomas — solo tests o admin. */
export async function preloadAllTranslations(): Promise<Record<Language, Translation>> {
  const [es, en] = await Promise.all([loadTranslation('es'), loadTranslation('en')]);
  return { es, en };
}