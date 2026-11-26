import type { Localized } from 'src/Logic/Language/Localized';

// CONCEPT: laat deze tekst controleren door de eigenaar of een jurist voordat de wachtlijst live gaat.
// Klopt er iets niet meer met wat de site doet (worker/index.ts, migrations/), pas het dan hier aan.

// Wie verantwoordelijk is en hoe je ons bereikt. Vul het contactadres in vóór livegang: zonder adres kan niemand zijn rechten uitoefenen.
export const privacyContact = {
    controller: 'Expedition Games',
    email: '',
};

export const privacy = {
    title: { en: 'Privacy statement', nl: 'Privacyverklaring' } satisfies Localized,
    updated: { en: 'Draft, 26 November 2026', nl: 'Concept, 26 november 2026' } satisfies Localized,
    contactLine: {
        en: 'Questions, or want to see or delete your data? Email us at',
        nl: 'Vragen, of wil je je gegevens inzien of laten verwijderen? Mail ons via',
    } satisfies Localized,
    sections: [
        {
            title: { en: 'Who we are', nl: 'Wie we zijn' },
            body: [
                {
                    en: `UpNext is an app by ${privacyContact.controller}. We are responsible for the personal data collected on this site.`,
                    nl: `UpNext is een app van ${privacyContact.controller}. Wij zijn verantwoordelijk voor de persoonsgegevens die op deze site worden verzameld.`,
                },
            ],
        },
        {
            title: { en: 'What we collect', nl: 'Wat we verzamelen' },
            body: [
                {
                    en: 'Waitlist: if you sign up, we store your email address, your language, where on the page you signed up and when. Nothing else.',
                    nl: 'Wachtlijst: als je je aanmeldt, bewaren we je e-mailadres, je taal, waar op de pagina je je aanmeldde en wanneer. Verder niets.',
                },
                {
                    en: 'Clicks: we count how often the Download and store buttons are pressed, per day. That count is anonymous: no IP address, no cookie, nothing that leads back to you.',
                    nl: 'Klikken: we tellen hoe vaak er per dag op de Download- en store-knoppen wordt gedrukt. Die telling is anoniem: geen IP-adres, geen cookie, niets wat naar jou terug te leiden is.',
                },
                {
                    en: 'No cookies or trackers. Your language choice is saved in your own browser only.',
                    nl: 'Geen cookies of trackers. Je taalkeuze wordt alleen in je eigen browser bewaard.',
                },
            ],
        },
        {
            title: { en: 'Why', nl: 'Waarvoor' },
            body: [
                {
                    en: 'We use your email address only to let you know when UpNext is in the stores. We do this because you asked for it by signing up (your consent). We count clicks to see how much interest there is in the app.',
                    nl: 'We gebruiken je e-mailadres alleen om je te laten weten wanneer UpNext in de stores staat. Dat doen we omdat je daar zelf om vraagt door je aan te melden (je toestemming). Klikken tellen we om te zien hoeveel interesse er is in de app.',
                },
            ],
        },
        {
            title: { en: 'How long', nl: 'Hoe lang' },
            body: [
                {
                    en: 'We keep the waitlist until at most six months after UpNext launches, and then delete it. Ask us earlier, and we delete your address right away.',
                    nl: 'We bewaren de wachtlijst tot uiterlijk zes maanden nadat UpNext is gelanceerd en verwijderen hem daarna. Vraag je het eerder, dan verwijderen we je adres meteen.',
                },
            ],
        },
        {
            title: { en: 'Who else is involved', nl: 'Wie er verder bij betrokken is' },
            body: [
                {
                    en: 'Cloudflare hosts this site and stores the waitlist, in the EU. To deliver the site and block abuse, Cloudflare processes your IP address; we do not store it. We send the launch email with Brevo (EU). We have a data processing agreement with both. We never sell or share your data.',
                    nl: 'Cloudflare host deze site en bewaart de wachtlijst, in de EU. Om de site te leveren en misbruik tegen te houden, verwerkt Cloudflare je IP-adres; wij slaan dat niet op. De mail bij de lancering versturen we met Brevo (EU). Met beide hebben we een verwerkersovereenkomst. We verkopen of delen je gegevens nooit.',
                },
            ],
        },
        {
            title: { en: 'Your rights', nl: 'Je rechten' },
            body: [
                {
                    en: 'You can see, correct or delete your data, and withdraw your consent at any time. Every email has an unsubscribe link. Not happy with how we handle your data? You can file a complaint with the Dutch Data Protection Authority (Autoriteit Persoonsgegevens).',
                    nl: 'Je kunt je gegevens inzien, laten aanpassen of verwijderen, en je toestemming altijd intrekken. In elke mail staat een afmeldlink. Ben je niet tevreden over hoe we met je gegevens omgaan? Dan kun je een klacht indienen bij de Autoriteit Persoonsgegevens.',
                },
            ],
        },
    ] satisfies { title: Localized; body: Localized[] }[],
};
