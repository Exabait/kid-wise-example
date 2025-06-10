export const Languages = {
  en: 'en',
  uk: 'uk',
} as const;

export type Language = (typeof Languages)[keyof typeof Languages];
