import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Language } from './i18n/types';
import { loadTranslation } from './i18n/loader';
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
  const [dictionary, setDictionary] = useState<Translation | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadTranslation(language).then((dict) => {
      if (!cancelled) setDictionary(dict);
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