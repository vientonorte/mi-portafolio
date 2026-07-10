import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language } from './i18n/types';
import {
  getTranslationSync,
  isTranslationLoaded,
  loadTranslation,
} from './i18n/loader';
import type { Translation } from './i18n/types';
import { TranslationProvider } from './i18n/TranslationContext';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function readStoredLanguage(): Language {
  try {
    const saved = localStorage.getItem('language') as Language;
    if (saved === 'es' || saved === 'en') return saved;
  } catch {
    /* localStorage blocked */
  }
  return 'es';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage);
  const [dictionary, setDictionary] = useState<Translation | null>(() => {
    const lang = readStoredLanguage();
    return isTranslationLoaded(lang) ? getTranslationSync(lang) : null;
  });
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoadError(null);

    loadTranslation(language)
      .then((dict) => {
        if (!cancelled) setDictionary(dict);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        console.error('[i18n] loadTranslation failed', language, err);
        setLoadError(
          language === 'es'
            ? 'No se pudo cargar el idioma. Recarga la página.'
            : 'Could not load language. Please reload.'
        );
      });

    return () => {
      cancelled = true;
    };
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('language', lang);
    } catch {
      /* ignore */
    }
  };

  if (loadError) {
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
          {language === 'es' ? 'Recargar' : 'Reload'}
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
        aria-label={language === 'es' ? 'Cargando idioma…' : 'Loading language…'}
      />
    );
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <TranslationProvider dictionary={dictionary}>{children}</TranslationProvider>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}