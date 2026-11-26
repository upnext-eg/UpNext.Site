import type { Localized } from 'src/Logic/Language/Localized';

// Teksten overgenomen uit UpNext.Onepager (src/Config/site.ts). Merknaam altijd UpNext; geen andere apps noemen; geen vaste tijden die in de app instelbaar zijn.

export const meta = {
    title: {
        en: 'UpNext: the group game that runs all night',
        nl: 'UpNext: het groepsspel dat de hele avond doorgaat',
    } satisfies Localized,
    description: {
        en: 'Start a session, put your phone away and wait for the ping. UpNext turns your night out into one surprise group game.',
        nl: 'Start een sessie, leg je telefoon weg en wacht op de melding. UpNext maakt van je avond met vrienden één onverwacht groepsspel.',
    } satisfies Localized,
};

// null zolang de app nog niet in de store staat: de knop is dan geen link en zegt "Coming soon".
export const storeLinks: { appStore: string | null; googlePlay: string | null } = {
    appStore: null,
    googlePlay: null,
};

export const header = {
    homeLabel: { en: 'UpNext, back to top', nl: 'UpNext, naar boven' } satisfies Localized,
    download: { en: 'Download', nl: 'Download' } satisfies Localized,
    languageLabel: { en: 'Language', nl: 'Taal' } satisfies Localized,
    skipLink: { en: 'Skip to content', nl: 'Naar de inhoud' } satisfies Localized,
};

export const showcase = {
    label: { en: 'How a night with UpNext goes', nl: 'Zo gaat een avond met UpNext' } satisfies Localized,
};

export const upNextMoment = {
    // De pushmelding, zoals in UpNext.md.
    notificationTitle: { en: 'UP NEXT!', nl: 'UP NEXT!' } satisfies Localized,
    notificationBody: { en: 'It’s your turn.', nl: 'Jij bent aan de beurt.' } satisfies Localized,
    now: { en: 'now', nl: 'nu' } satisfies Localized,
};

// Het slot van de showcase: de telefoon in het midden, eromheen de banner uit Designs/ (upnext-banner).
export const outro = {
    subtitle: { en: 'Coming soon to the stores', nl: 'Binnenkort in de stores' } satisfies Localized,
    launch: 'Q1 2027',
};

export const callToAction = {
    title: { en: 'Make a night of it', nl: 'Maak er een avond van' } satisfies Localized,
    body: {
        en: 'Download UpNext, start a group and share the code. The app does the rest.',
        nl: 'Download UpNext, maak een groep en deel de code. De rest regelt de app.',
    } satisfies Localized,
    appStore: {
        overline: { en: 'Download on the', nl: 'Download in de' } satisfies Localized,
        comingSoon: { en: 'Coming soon to the', nl: 'Binnenkort in de' } satisfies Localized,
        name: 'App Store',
    },
    googlePlay: {
        overline: { en: 'Get it on', nl: 'Ontdek het op' } satisfies Localized,
        comingSoon: { en: 'Coming soon on', nl: 'Binnenkort op' } satisfies Localized,
        name: 'Google Play',
    },
};

export const footer = {
    tagline: {
        en: 'The surprise group game that runs all night.',
        nl: 'Het onverwachte groepsspel dat de hele avond doorgaat.',
    } satisfies Localized,
    pageTitle: { en: 'UpNext', nl: 'UpNext' } satisfies Localized,
    howItWorks: { en: 'How it works', nl: 'Zo werkt het' } satisfies Localized,
    download: { en: 'Download', nl: 'Download' } satisfies Localized,
    appTitle: { en: 'The app', nl: 'De app' } satisfies Localized,
    contactTitle: { en: 'Contact', nl: 'Contact' } satisfies Localized,
    kvkLabel: { en: 'CoC', nl: 'KvK' } satisfies Localized,
    privacyLabel: { en: 'Privacy policy', nl: 'Privacybeleid' } satisfies Localized,
    // Vóór livegang invullen met gegevens van de eigenaar (launch-checklist). Lege velden worden niet getoond;
    // zolang alles leeg is, verschijnt de kolom Contact niet.
    company: {
        name: '',
        email: '',
        kvk: '',
        privacyUrl: '',
    },
    copyright: `© ${new Date().getFullYear()} UpNext`,
};
