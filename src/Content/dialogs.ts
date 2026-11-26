import type { Localized } from 'src/Logic/Language/Localized';

export const dialogs = {
    close: { en: 'Close', nl: 'Sluiten' } satisfies Localized,
};

// De popup achter de store-knoppen: aanmelden om als een van de eersten te horen dat de app er is.
export const waitlist = {
    title: { en: 'Be one of the first', nl: 'Wees er als eerste bij' } satisfies Localized,
    body: {
        en: 'Want to be one of the first to download UpNext? Leave your email address and we’ll let you know the moment it’s in the stores.',
        nl: 'Wil je als een van de eersten de app downloaden? Laat dan je e-mailadres achter. We laten het je weten zodra UpNext in de stores staat.',
    } satisfies Localized,
    emailLabel: { en: 'Email address', nl: 'E-mailadres' } satisfies Localized,
    emailPlaceholder: { en: 'you@example.com', nl: 'jij@voorbeeld.nl' } satisfies Localized,
    submit: { en: 'Keep me posted', nl: 'Hou me op de hoogte' } satisfies Localized,
    finePrint: {
        en: 'We only use your email address to tell you when UpNext launches. You can unsubscribe at any time.',
        nl: 'We gebruiken je e-mailadres alleen om je te laten weten wanneer UpNext er is. Afmelden kan altijd.',
    } satisfies Localized,
    privacyLink: { en: 'Read the privacy statement', nl: 'Lees de privacyverklaring' } satisfies Localized,
    doneTitle: { en: 'You’re on the list', nl: 'Je staat op de lijst' } satisfies Localized,
    doneBody: {
        en: 'We’ll email you as soon as UpNext is in the stores.',
        nl: 'Zodra UpNext in de stores staat, krijg je van ons een mail.',
    } satisfies Localized,
    errors: {
        invalidEmail: {
            en: 'That doesn’t look like an email address.',
            nl: 'Dit is geen geldig e-mailadres.',
        } satisfies Localized,
        rateLimited: {
            en: 'Too many attempts. Try again in a minute.',
            nl: 'Te veel pogingen. Probeer het over een minuut opnieuw.',
        } satisfies Localized,
        failed: {
            en: 'That didn’t work. Check your connection and try again.',
            nl: 'Dat lukte niet. Controleer je verbinding en probeer het opnieuw.',
        } satisfies Localized,
    },
};
