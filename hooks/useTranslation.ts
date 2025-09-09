'use client';

import { useContext } from 'react';
import { LocaleContext } from '@/contexts/LocaleContext';
import { Locale } from '@/lib/i18n';

// Import translation files
import arTranslations from '@/locales/ar.json';
import enTranslations from '@/locales/en.json';
import trTranslations from '@/locales/tr.json';

const translations = {
  ar: arTranslations,
  en: enTranslations,
  tr: trTranslations,
};

type TranslationKey = string;

export function useTranslation() {
  const { locale } = useContext(LocaleContext);

  const t = (key: TranslationKey): string => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        let fallback: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallback && typeof fallback === 'object' && fallbackKey in fallback) {
            fallback = fallback[fallbackKey];
          } else {
            return key; // Return key if no translation found
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}
