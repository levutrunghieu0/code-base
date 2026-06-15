import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Language, TranslationKey, translations } from './translations';

interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);
const STORAGE_KEY = 'language';

function getInitialLanguage(): Language {
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
  if (stored && stored in translations) return stored;

  const browserLanguage = navigator.language.slice(0, 2);
  if (browserLanguage === 'vi' || browserLanguage === 'ja') return browserLanguage;

  return 'en';
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (nextLanguage: Language) => {
    localStorage.setItem(STORAGE_KEY, nextLanguage);
    setLanguageState(nextLanguage);
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key, params) => {
        let value: string = translations[language][key] || translations.en[key] || key;
        if (params) {
          Object.entries(params).forEach(([paramKey, paramValue]) => {
            value = value.replace(`{{${paramKey}}}`, String(paramValue));
          });
        }

        return value;
      },
    }),
    [language],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }

  return context;
}
