'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale, defaultLocale, getDirection } from '@/lib/i18n';

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  direction: 'ltr' | 'rtl';
}

export const LocaleContext = createContext<LocaleContextType>({
  locale: defaultLocale,
  setLocale: () => {},
  direction: 'rtl',
});

interface LocaleProviderProps {
  children: React.ReactNode;
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('rtl');

  // Load locale from localStorage on mount
  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && ['ar', 'en', 'tr'].includes(savedLocale)) {
      setLocaleState(savedLocale);
      setDirection(getDirection(savedLocale));
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setDirection(getDirection(newLocale));
    localStorage.setItem('locale', newLocale);
    
    // Update document direction and lang
    document.documentElement.dir = getDirection(newLocale);
    document.documentElement.lang = newLocale;
  };

  // Update document direction when locale changes
  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = locale;
  }, [locale, direction]);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, direction }}>
      {children}
    </LocaleContext.Provider>
  );
}
