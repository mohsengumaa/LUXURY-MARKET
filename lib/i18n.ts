export type Locale = 'ar' | 'en' | 'tr';

export const locales: Locale[] = ['ar', 'en', 'tr'];

export const defaultLocale: Locale = 'ar';

export const localeNames = {
  ar: 'العربية',
  en: 'English',
  tr: 'Türkçe',
};

export const localeFlags = {
  ar: '🇸🇦',
  en: '🇺🇸', 
  tr: '🇹🇷',
};

export const rtlLocales = ['ar'];

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale);
}

export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return isRTL(locale) ? 'rtl' : 'ltr';
}
