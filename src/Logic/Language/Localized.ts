// Engels is de standaard: eerst in de lijst, en de taal als er nog niets gekozen is.
export const languages = ['en', 'nl'] as const;

export type Language = (typeof languages)[number];

export const defaultLanguage: Language = 'en';

// Een tekst (of andere waarde) per taal. Elke zichtbare tekst in de content is zo opgebouwd.
export type Localized<T = string> = Record<Language, T>;
