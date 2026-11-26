import type { CalloutId } from 'src/Components/PhoneMockup/callouts';
import type { ScreenId } from 'src/Components/Screens/screens';
import type { Localized } from 'src/Logic/Language/Localized';

export type PhonePosition = 'center' | 'left' | 'right';

export interface ScreenFocus {
    // Het punt waar de camera op inzoomt, als deel van de schermhoogte: 0 is boven, 1 is onder.
    y: number;
    // 1 is de hele telefoon; hoger zoomt in, zodat bijvoorbeeld de roze footer onderaan uit beeld valt.
    zoom: number;
}

export interface FlowStep {
    id: string;
    // Waar de telefoon staat op een breed scherm; de tekst komt aan de andere kant. Op mobiel staat hij altijd in het midden.
    phone: PhonePosition;
    screen: ScreenId;
    // Een echte screenshot per taal (bv. '/screens/group-en.png' uit public/), 390 × 844 of een veelvoud. Vervangt de placeholder.
    screenshot?: Localized;
    // Beschrijving van het scherm voor screenreaders.
    alt: Localized;
    // Zonder focus blijft de hele telefoon in beeld.
    focus?: ScreenFocus;
    // Een element dat in 3D uit het scherm naar voren komt (zie callouts.ts).
    callout?: CalloutId;
    // Het moment waarop de pushmelding binnenkomt: de telefoon schudt en het beeld loopt geel vol. De tekst staat dan op geel.
    isUpNextMoment?: boolean;
    title: Localized;
    // Optioneel tweede deel van de titel, in geel (de openingskop: "Who’s UpNext?").
    titleAccent?: Localized;
    description: Localized;
}

// De happy flow uit UpNext.Onepager (src/Config/happyFlow.ts), met de camera en telefoonposities van deze site.
// Een stap toevoegen, weghalen of verplaatsen gebeurt alleen hier: de scroll-tijdlijn rekent alles opnieuw uit.
export const happyFlow: FlowStep[] = [
    {
        id: 'intro',
        phone: 'center',
        screen: 'yourTurn',
        alt: {
            en: 'UpNext in a live session: UP NEXT! It’s your turn, open your challenge within 4:32.',
            nl: 'UpNext tijdens een sessie: UP NEXT! Jij bent aan de beurt, open je opdracht binnen 4:32.',
        },
        title: { en: 'Who’s', nl: 'Wie is er' },
        titleAccent: { en: 'UpNext?', nl: 'UpNext?' },
        description: {
            en: 'Play one surprise group game all night long. Start a session, put your phone away and wait for the ping.',
            nl: 'Speel de hele avond één onverwacht groepsspel. Start een sessie, leg je telefoon weg en wacht op de melding.',
        },
    },
    {
        id: 'group',
        phone: 'right',
        screen: 'groupCreated',
        focus: { y: 0.33, zoom: 1.35 },
        alt: {
            en: 'Group created: the group code XK7-4PQ to share, with Noor as owner.',
            nl: 'Groep aangemaakt: de groepscode XK7-4PQ om te delen, met Noor als eigenaar.',
        },
        title: { en: 'Start a group', nl: 'Maak een groep' },
        description: {
            en: 'Pick your name and share the code with your friends. They’re in within seconds.',
            nl: 'Kies jullie naam en deel de code met je vrienden. Zo zitten ze er in een paar tellen in.',
        },
    },
    {
        id: 'start',
        phone: 'left',
        screen: 'startSession',
        focus: { y: 0.5, zoom: 1.25 },
        alt: {
            en: 'Start a session: Noor and Sam are in, Yara and Mo are not.',
            nl: 'Sessie starten: Noor en Sam doen mee, Yara en Mo niet.',
        },
        title: { en: 'Start the session', nl: 'Start de sessie' },
        description: {
            en: 'Play with the whole group or just your bestie: you pick who’s in tonight. Tap start and the game is on.',
            nl: 'Speel met de hele groep of alleen met je bestie: jij kiest wie er vanavond meedoet. Tik op start en het spel loopt.',
        },
    },
    {
        id: 'wait',
        phone: 'right',
        screen: 'waiting',
        focus: { y: 0.33, zoom: 1.35 },
        alt: {
            en: 'The session is live: next turn in about eight minutes.',
            nl: 'De sessie loopt: volgende beurt over ongeveer acht minuten.',
        },
        title: { en: 'Put your phone away', nl: 'Leg je telefoon weg' },
        description: {
            en: 'UpNext keeps track of time and pings you the moment it’s your turn. Meanwhile you can dance, laugh, chat and actually enjoy the moment.',
            nl: 'UpNext houdt de tijd bij en laat het weten zodra jij aan de beurt bent. Ondertussen kun je dansen, lachen, kletsen en echt genieten van het moment.',
        },
    },
    {
        id: 'up-next',
        phone: 'left',
        screen: 'yourTurn',
        focus: { y: 0.3, zoom: 1.1 },
        callout: 'notification',
        isUpNextMoment: true,
        alt: {
            en: 'Push notification: UP NEXT! It’s your turn.',
            nl: 'Pushmelding: UP NEXT! Jij bent aan de beurt.',
        },
        title: { en: 'Suddenly, it’s you', nl: 'Ineens ben jij het' },
        description: {
            en: 'At a random moment, UpNext picks one player. Nobody knows who or when. Your challenge drops and the clock starts.',
            nl: 'Op een onverwacht moment kiest UpNext één speler. Niemand weet wie of wanneer. Je krijgt je challenge en de tijd gaat lopen.',
        },
    },
    {
        id: 'challenge',
        phone: 'right',
        screen: 'challenge',
        focus: { y: 0.38, zoom: 1.3 },
        alt: {
            en: 'The challenge: a group photo with a stranger, with a running timer.',
            nl: 'De opdracht: groepsfoto met een vreemde, met een timer die loopt.',
        },
        title: { en: 'Open your challenge', nl: 'Open je opdracht' },
        description: {
            en: 'Dance, take on a dare or shoot a photo you’ll want to see tomorrow. The clock only starts once you open it.',
            nl: 'Doe een dansje, ga een durfopdracht aan of maak een foto die je morgen nog wilt zien. De klok loopt pas als je de opdracht opent.',
        },
    },
    {
        id: 'submit',
        phone: 'left',
        screen: 'camera',
        alt: {
            en: 'The in-app camera, with a choice between photo and video.',
            nl: 'De camera in de app, met een keuze tussen foto en video.',
        },
        title: { en: 'Show it', nl: 'Laat het zien' },
        description: {
            en: 'Shoot a photo or video in the app, pick one from your gallery or type your answer. Send it in and put your phone away again.',
            nl: 'Maak een foto of video in de app, kies er een uit je galerij of typ je antwoord. Stuur het in en leg je telefoon weer weg.',
        },
    },
    {
        id: 'timeline',
        phone: 'right',
        screen: 'timeline',
        focus: { y: 0.42, zoom: 1.25 },
        alt: {
            en: 'The live session timeline with photos, videos and answers from the group.',
            nl: 'De live tijdlijn van de sessie met foto’s, video’s en antwoorden van de groep.',
        },
        title: { en: 'The whole night, one timeline', nl: 'De hele avond in één tijdlijn' },
        description: {
            en: 'Everything lands live, even for friends watching from home. Tomorrow you play the night back and download the photos and videos.',
            nl: 'Alles komt live binnen, ook bij wie thuis meekijkt. Morgen kijk je de avond terug en download je de foto’s en video’s.',
        },
    },
];
