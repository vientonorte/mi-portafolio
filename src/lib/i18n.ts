import type { Language, Translation } from './i18n/types';
import { useTranslationDictionary } from './i18n/TranslationContext';
import {
  getTranslationSync,
  isTranslationLoaded,
  loadTranslation,
  preloadAllTranslations,
} from './i18n/loader';

export type { Language, Translation };

export { loadTranslation, getTranslationSync, isTranslationLoaded, preloadAllTranslations };

/** @param _lang — ignorado; el diccionario activo viene del LanguageProvider */
export function useTranslation(_lang?: Language): Translation {
  return useTranslationDictionary();
}

/** @deprecated Usar loadTranslation / getTranslationSync. Mantenido para tests. */
export async function getTranslationsRecord(): Promise<Record<Language, Translation>> {
  return preloadAllTranslations();
}