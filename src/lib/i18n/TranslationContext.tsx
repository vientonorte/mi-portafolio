import { createContext, useContext, type ReactNode } from 'react';
import type { Translation } from './types';

const TranslationContext = createContext<Translation | null>(null);

export function TranslationProvider({
  dictionary,
  children,
}: {
  dictionary: Translation;
  children: ReactNode;
}) {
  return (
    <TranslationContext.Provider value={dictionary}>{children}</TranslationContext.Provider>
  );
}

export function useTranslationDictionary(): Translation {
  const dictionary = useContext(TranslationContext);
  if (!dictionary) {
    throw new Error('useTranslation requires TranslationProvider with a loaded dictionary');
  }
  return dictionary;
}