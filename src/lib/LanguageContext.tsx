import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Language, Translation } from "./i18n/types";
import {
  getTranslationSync,
  isTranslationLoaded,
  loadTranslation,
} from "./i18n/loader";
import { TranslationProvider } from "./i18n/TranslationContext";
import { persistLanguage, readStoredLanguage } from "./language-storage";

interface LanguageContextType {
  language: Language;
  /** Swap simétrico ES↔EN: language + diccionario en el mismo commit de React. */
  setLanguage: (lang: Language) => void;
  isSwitching: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LocaleState = {
  language: Language;
  dictionary: Translation | null;
};

/** Pone `document.documentElement.lang` en el idioma activo ("es" | "en"). */
export function syncDocumentLang(lang: Language): void {
  if (typeof document === "undefined") return;
  if (document.documentElement.lang !== lang) document.documentElement.lang = lang;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const initialLang = readStoredLanguage();

  const [locale, setLocale] = useState<LocaleState>(() => ({
    language: initialLang,
    dictionary: isTranslationLoaded(initialLang)
      ? getTranslationSync(initialLang)
      : null,
  }));
  const [isSwitching, setIsSwitching] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Bootstrap: solo el locale activo (es default). EN se carga en el toggle.
  useEffect(() => {
    let cancelled = false;
    if (isTranslationLoaded(initialLang)) return;

    (async () => {
      try {
        const lang = readStoredLanguage();
        const dict = await loadTranslation(lang);
        if (cancelled) return;
        setLocale({ language: lang, dictionary: dict });
      } catch (err) {
        if (cancelled) return;
        console.error("[i18n] bootstrap failed", err);
        setLoadError(
          initialLang === "es"
            ? "No se pudo cargar el idioma. Recarga la página."
            : "Could not load language. Please reload."
        );
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo mount
  }, []);

  // <html lang> sigue al idioma activo (lectores de pantalla, traductores, :lang()).
  // Las páginas estáticas sin provider (p. ej. /servicios/) quedan con el lang="es" de su HTML.
  useEffect(() => {
    syncDocumentLang(locale.language);
  }, [locale.language]);

  const setLanguage = useCallback((lang: Language) => {
    setLocale((prev) => {
      if (lang === prev.language) return prev;

      // Cache hit (tras toggle previo): un solo setState → sin carrera ES→EN ni EN→ES
      if (isTranslationLoaded(lang)) {
        persistLanguage(lang);
        return { language: lang, dictionary: getTranslationSync(lang) };
      }

      // Cache miss: carga async y un solo setState al resolver
      setIsSwitching(true);
      setLoadError(null);
      loadTranslation(lang)
        .then((dict) => {
          persistLanguage(lang);
          setLocale({ language: lang, dictionary: dict });
        })
        .catch((err: unknown) => {
          console.error("[i18n] setLanguage failed", lang, err);
          setLoadError(
            prev.language === "es"
              ? "No se pudo cambiar el idioma. Intenta de nuevo."
              : "Could not switch language. Please try again."
          );
        })
        .finally(() => {
          setIsSwitching(false);
        });

      return prev;
    });
  }, []);

  const value = useMemo(
    () => ({
      language: locale.language,
      setLanguage,
      isSwitching,
    }),
    [locale.language, setLanguage, isSwitching]
  );

  if (loadError && !locale.dictionary) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center"
        role="alert"
      >
        <p className="text-sm text-muted-foreground">{loadError}</p>
        <button
          type="button"
          className="min-h-[44px] rounded-md bg-[var(--vn-color-cta-bg)] px-4 text-sm font-semibold text-[var(--vn-color-cta-fg)] hover:bg-[var(--vn-color-cta-bg-hover)]"
          onClick={() => window.location.reload()}
        >
          {initialLang === "es" ? "Recargar" : "Reload"}
        </button>
      </div>
    );
  }

  if (!locale.dictionary) {
    return (
      <div
        className="min-h-screen bg-background"
        role="status"
        aria-live="polite"
        aria-label={
          initialLang === "es" ? "Cargando idioma…" : "Loading language…"
        }
      />
    );
  }

  return (
    <LanguageContext.Provider value={value}>
      <TranslationProvider dictionary={locale.dictionary}>
        {children}
      </TranslationProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
