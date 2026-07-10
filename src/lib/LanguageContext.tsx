import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  /** Cambia idioma solo cuando el diccionario ya está en cache (sin carrera EN↔ES). */
  setLanguage: (lang: Language) => void;
  /** true mientras se carga el locale destino (toggle). */
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

export function LanguageProvider({ children }: { children: ReactNode }) {
  const initialLang = readStoredLanguage();
  const [language, setLanguageState] = useState<Language>(initialLang);
  const [dictionary, setDictionary] = useState<Translation | null>(() =>
    isTranslationLoaded(initialLang) ? getTranslationSync(initialLang) : null
  );
  const [isSwitching, setIsSwitching] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Bootstrap: locale activo + precarga del otro (cambios EN↔ES sin gap)
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const dict = await loadTranslation(initialLang);
        if (cancelled) return;
        setDictionary(dict);
        // Segundo locale en background — no bloquea first paint
        void preloadAllTranslations().catch((err) => {
          console.warn("[i18n] preloadAllTranslations", err);
        });
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
    // solo al montar
    // eslint-disable-next-line react-hooks/exhaustive-deps -- initialLang capturado al mount
  }, []);

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;

    // Ya en cache: swap atómico language + dictionary
    if (isTranslationLoaded(lang)) {
      setDictionary(getTranslationSync(lang));
      setLanguageState(lang);
      try {
        localStorage.setItem("language", lang);
      } catch {
        /* ignore */
      }
      return;
    }

    // No en cache: cargar primero, luego commitear ambos juntos
    setIsSwitching(true);
    setLoadError(null);
    loadTranslation(lang)
      .then((dict) => {
        setDictionary(dict);
        setLanguageState(lang);
        try {
          localStorage.setItem("language", lang);
        } catch {
          /* ignore */
        }
      })
      .catch((err: unknown) => {
        console.error("[i18n] setLanguage failed", lang, err);
        setLoadError(
          language === "es"
            ? "No se pudo cambiar el idioma. Intenta de nuevo."
            : "Could not switch language. Please try again."
        );
      })
      .finally(() => {
        setIsSwitching(false);
      });
  }, [language]);

  if (loadError && !dictionary) {
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

  if (!dictionary) {
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
    <LanguageContext.Provider value={{ language, setLanguage, isSwitching }}>
      <TranslationProvider dictionary={dictionary}>{children}</TranslationProvider>
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
