// Het contract tussen de site (src/) en de Worker (worker/): welke waarden de API accepteert. Beide kanten importeren dit bestand.

export const siteLanguages = ['en', 'nl'] as const;

// Wat er geteld wordt: de Download-knop en de twee store-knoppen (de downloadbereidheid).
export const clickTargets = ['download', 'appStore', 'googlePlay'] as const;

// Waar op de pagina de knop stond.
export const clickSources = ['header', 'outro', 'cta', 'footer'] as const;

export type SiteLanguage = (typeof siteLanguages)[number];
export type ClickTarget = (typeof clickTargets)[number];
export type ClickSource = (typeof clickSources)[number];

export interface WaitlistRequest {
    email: string;
    language: SiteLanguage;
    source: ClickSource;
    // Honeypot: een veld dat een mens niet ziet. Is het ingevuld, dan is het een bot.
    website?: string;
}

export interface ClickRequest {
    target: ClickTarget;
    source: ClickSource;
}

export const apiPaths = {
    waitlist: '/api/waitlist',
    clicks: '/api/clicks',
} as const;
