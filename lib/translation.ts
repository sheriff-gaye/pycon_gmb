import enTranslations from './lang/en.json';
import frTranslations from './lang/fr.json';

export const translations = {
  en: enTranslations,
  fr: frTranslations,
} as const;

export type Translations = typeof translations;
export type Locale = keyof Translations;

type StringKeys<T> = Extract<keyof T, string>;

type GetNestedKeys<T, K extends string = ""> = T extends Record<string, undefined>
  ? {
      [P in StringKeys<T>]: T[P] extends Record<string, undefined>
        ? GetNestedKeys<T[P], K extends "" ? P : `${K}.${P}`>
        : K extends ""
        ? P
        : `${K}.${P}`;
    }[StringKeys<T>]
  : never;

export type TranslationKey = GetNestedKeys<Translations[Locale]>;