import type { Language, Translation } from './types';

const cache: Partial<Record<Language, Translation>> = {};

/** In-flight loads — evita carreras y doble import del mismo locale. */
const pending: Partial<Record<Language, Promise<Translation>>> = {};

type LocaleModule = { default: Translation };

const loaders: Record<Language, () => Promise<LocaleModule>> = {
  es: () => import('./locales/es') as Promise<LocaleModule>,
  en: () => import('./locales/en') as Promise<LocaleModule>,
};

export async function loadTranslation(lang: Language): Promise<Translation> {
  if (cache[lang]) return cache[lang]!;
  if (pending[lang]) return pending[lang]!;

  pending[lang] = loaders[lang]()
    .then((mod) => {
      cache[lang] = mod.default;
      delete pending[lang];
      return mod.default;
    })
    .catch((err) => {
      delete pending[lang];
      throw err;
    });

  return pending[lang]!;
}

/**
 * Diccionario ya cargado. Preferir `useTranslation()` en React.
 * Fallback a cualquier locale en cache para no tumbar la app por carrera HMR/prefetch.
 */
export function getTranslationSync(lang: Language): Translation {
  const dict = cache[lang] ?? cache.es ?? cache.en;
  if (!dict) {
    throw new Error(
      `Translation "${lang}" is not loaded yet — wait for LanguageProvider / loadTranslation()`
    );
  }
  return dict;
}

export function isTranslationLoaded(lang: Language): boolean {
  return Boolean(cache[lang]);
}

/** Precarga ambos idiomas — tests, admin o bootstrap. */
export async function preloadAllTranslations(): Promise<Record<Language, Translation>> {
  const [es, en] = await Promise.all([loadTranslation('es'), loadTranslation('en')]);
  return { es, en };
}