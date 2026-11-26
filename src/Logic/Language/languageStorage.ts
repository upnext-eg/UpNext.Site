import { defaultLanguage, languages } from './Localized';
import type { Language } from './Localized';

const storageKey = 'upnext.language';

function isLanguage(value: unknown): value is Language {
    return languages.includes(value as Language);
}

// De eerder gekozen taal, anders Engels. localStorage kan ontbreken of gooien (privévenster).
export function getInitialLanguage(): Language {
    try {
        const stored = window.localStorage.getItem(storageKey);
        if (isLanguage(stored)) {
            return stored;
        }
    } catch {
        // Geen opslag beschikbaar: dan de standaardtaal.
    }

    return defaultLanguage;
}

export function storeLanguage(language: Language) {
    try {
        window.localStorage.setItem(storageKey, language);
    } catch {
        // Niet opslaan is geen probleem: de keuze geldt dan alleen voor dit bezoek.
    }
}
