/* eslint-disable @typescript-eslint/no-explicit-any */
import { Locale, translations } from "./translation";

export const defaultLocale: Locale = 'en';
export const locales = ['en', 'fr'] as const;

export function getDictionary(locale: string) {
  return translations[locale as keyof typeof translations] || translations.en;
}

export const getTranslation = (locale: string, key: string): string => {
  const keys = key.split('.');
  const translation = translations[locale as Locale] || translations.en;
  
  let result: any = translation;
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      return key;
    }
  }
  
  return typeof result === 'string' ? result : key;
};