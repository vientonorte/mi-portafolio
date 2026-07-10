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
  preloadAllTranslations,
} from "./i18n/loader";
import { TranslationProvider } from "./i18n/TranslationContext";

interface LanguageContextType {
  language: Language;
  /** Swap simétrico ES↔EN: language + diccionario en el mismo commit de React. */
  setLanguage: (lang: Language) => void;
  isSwitching: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function readStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem("language") as Language;
    if (saved === "es" || saved === "en") return saved;
  } catch {
    /* localStorage blocked */
  }
  return "es";
}

function persistLanguage(lang: Language) {
  try {
    localStorage.setItem("language", lang);
  } catch {
    /* ignore */
  }
}

type LocaleState = {
  language: Language;
  dictionary: Translation | null;
};

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

  // Bootstrap: carga ES+EN y activa el guardado; sin gap al invertir el toggle
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const all = await preloadAllTranslations();
        if (cancelled) return;
        const lang = readStoredLanguage();
        setLocale({ language: lang, dictionary: all[lang] });
      } catch (err) {
        if (cancelled) return;
        console.error("[i18n] bootstrap failed", err);
        // Fallback: al menos el locale inicial
        try {
          const dict = await loadTranslation(initialLang);
          if (cancelled) return;
          setLocale({ language: initialLang, dictionary: dict });
        } catch (err2) {
          if (cancelled) return;
          console.error("[i18n] fallback load failed", err2);
          setLoadError(
            initialLang === "es"
              ? "No se pudo cargar el idioma. Recarga la página."
              : "Could not load language. Please reload."
          );
        }
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- solo mount
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    setLocale((prev) => {
      if (lang === prev.language) return prev;

      // Cache hit (típico tras preload): un solo setState → sin carrera ES→EN ni EN→ES
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
          className="min-h-[44px] rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground"
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
