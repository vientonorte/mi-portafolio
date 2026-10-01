import type { Language } from "./i18n/types";

/** Clave de localStorage que la home lee al cargar (LanguageProvider). */
export const LANGUAGE_STORAGE_KEY = "language";

/** Idioma guardado; "es" si no hay o si localStorage está bloqueado. */
export function readStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* localStorage blocked */
  }
  return "es";
}

/** También la usan páginas estáticas sin provider (p. ej. /servicios/ → home en inglés). */
export function persistLanguage(lang: Language) {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}
