// translation.ts
import enTranslations from './lang/en.json';
import frTranslations from './lang/fr.json';

export const translations = {
  en: enTranslations,
  fr: frTranslations,
} as const;

export type Translations = typeof translations;
export type Locale = keyof Translations;
export type TranslationKey = {
  [K in Locale]: {
    [P in keyof Translations[K]]: {
      [Q in keyof Translations[K][P]]: `${P}.${Q}`;
    }[keyof Translations[K][P]];
  }[keyof Translations[K]];
}[Locale];