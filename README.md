# UpNext.Site

Onepager voor de UpNext-app: één telefoon die meescrollt door de happy flow (groep maken → sessie starten → wachten → UP NEXT! → opdracht → insturen → tijdlijn), met een call-to-action en footer onderaan. Tweetalig (Engels standaard, Nederlands via de taalknop).

Ontwerp van de pagina (navigatiebalk, knoppen, taalknop, footer, app-schermen en teksten) komt uit `../UpNext.Onepager`; de telefoon, de camera en de scroll-animatie zijn van deze site.

React + TypeScript + Vite, Tailwind CSS v4, GSAP (ScrollTrigger, `@gsap/react`). Geen backend.

| Commando | Doel |
|---|---|
| `npm run dev` | dev server op http://localhost:5173 |
| `npm run build` | type-check + productiebuild in `dist/` (statische bestanden) |
| `npm run preview` | de build lokaal bekijken |
| `npm run lint` | eslint |
| `npm run format` / `format:check` | prettier |

## Deploy (Cloudflare Pages)

De site draait op <https://expedition-games.com>, via Cloudflare Pages (niet op de VPS). `main` is altijd productie; er is geen `develop` en geen staging.

- **Branches**: `feature/*` → `main` via een PR, nooit direct naar `main` pushen. Kleine commits met een Engels subject in de gebiedende wijs.
- **CI** (`.github/workflows/ci.yml`, GitHub Actions): lint, prettier en de build op elke PR en elke push naar `main`. Met branch protection kan een PR pas naar `main` als die groen is.
- **Pages** bouwt zelf, los van de CI: elke push naar `main` gaat live, elke andere branch krijgt een eigen preview-URL (`<branch>.upnext-site.pages.dev`). Een preview is openbaar, net als de site.
- **Node**: `.node-version`, voor Pages en de CI samen.
- **Headers**: `public/_headers` (komt in `dist/`). Bestanden in `/assets/` hebben een hash in de naam en mogen een jaar in de cache; `index.html` niet, zodat een nieuwe versie meteen zichtbaar is.
- **Terug naar een eerdere versie**: Workers & Pages → `upnext-site` → Deployments → bij de versie die je wilt: ⋯ → Rollback to this deployment. De volgende push naar `main` gaat er weer overheen.

### Eenmalig opzetten

1. **Pages-project**: Cloudflare → Workers & Pages → Create → Pages → Connect to Git. Geef de GitHub-app alleen toegang tot `UpNext.Site`. Instellingen:

    | | |
    |---|---|
    | Project name | `upnext-site` |
    | Production branch | `main` |
    | Framework preset | None |
    | Build command | `npm run build` |
    | Build output directory | `dist` |

    Na de eerste build staat de site op `upnext-site.pages.dev`.

2. **Domein**: in het project → Custom domains → `expedition-games.com`. Pages zet het DNS-record zelf. Staat er al een A- of CNAME-record op het kale domein, dan moet dat eerst weg (DNS → Records); laat MX en TXT staan (mail, SPF en DKIM van Brevo).
3. **www**: voeg ook `www.expedition-games.com` toe als custom domain, en maak een redirect: Rules → Redirect Rules → template "Redirect from WWW to root" (301, pad en query blijven).
4. **Branch protection** (GitHub → Settings → Branches → `main`): een PR verplicht, en de check `check` moet slagen.
5. **Monitoring**: een uptime-monitor in Better Stack op `https://expedition-games.com`.

## Inhoud aanpassen

- **Taal**: elke zichtbare tekst is `{ en, nl }` (`Localized`, `src/Logic/Language/`); `useLanguage().t(...)` kiest de vertaling. Zonder opgeslagen keuze is de taal Engels; de keuze staat in `localStorage` (`upnext.language`).
- **Stappen**: `src/Content/happyFlow.ts`. Per stap de tekst (EN/NL), het scherm, een beschrijving voor screenreaders (`alt`) en waar de telefoon staat (`left`, `center`, `right`; de tekst komt aan de andere kant). Een stap toevoegen of weghalen is genoeg: de timeline wordt uit deze lijst opgebouwd.
- **Echte screenshots**: zet een PNG/WebP van 390 × 844 (of 1170 × 2532) in `public/screens/` en vul bij de stap `screenshot: { en: '/screens/home-en.png', nl: '/screens/home-nl.png' }` in. De placeholder verdwijnt dan vanzelf.
- **Camera**: `focus: { y, zoom }` per stap zoomt in op een punt van het scherm (`y` als deel van de schermhoogte). Zonder `focus` blijft de hele telefoon in beeld.
- **Callouts**: `callout: 'notification'` laat de pushmelding bij het UP NEXT-moment van boven in het scherm vallen en in 3D naar voren komen (`src/Components/PhoneMockup/callouts.ts`). Maak de screenshot van die stap dan zonder melding, anders staat hij er twee keer.
- **Teksten, store-links en footer**: `src/Content/site.ts`. Vul `storeLinks` in zodra de app in de store staat; tot die tijd zijn de store-knoppen geen link en zeggen ze "Coming soon". De kolom Contact in de footer verschijnt pas als `footer.company` gegevens heeft.
- **Schermen**: `src/Components/Screens/`, de app-schermen uit UpNext.Onepager nagebouwd in Tailwind op 390 × 844 (`Parts/` voor ScreenCanvas, PinkFooter, HeroCard, RowCard, YellowPill, ...). Iconen: Material Design Icons via `@mdi/js`, net als de app.
- **Kleuren en fonts**: `src/index.css` (`@theme`), gelijk aan `src/colors.ts` in de Client.

## Hoe de animatie werkt

`src/Components/Showcase/ScrollShowcase.tsx` bouwt één GSAP-timeline met ScrollTrigger (`pin` + `scrub`): de scrollpositie bepaalt hoe ver de timeline is, dus terugscrollen speelt alles terug. De pagina scrollt gewoon native; er wordt niets gekaapt of gesnapt.

- Per stap schuift en zoomt de camera in één beweging naar het volgende focuspunt (nooit eerst terug naar achteren: dat voelt als zeeziek), en leunt de telefoon onderweg even naar de nieuwe kant. De poses staan in `showcaseMotion.ts`.
- Het UP NEXT-moment (`isUpNextMoment` in happyFlow.ts) komt uit UpNext.Onepager: een gele vloed vanuit de telefoon vult het beeld, "UP NEXT!" staat erachter, de melding valt binnen en de telefoon schudt. De tekst van die stap staat in indigo/navy op het geel en verdwijnt met een wipe.
- Na de laatste stap schuift de telefoon recht en heel in beeld naar het midden en verschijnt de banner uit Designs/ eromheen (UpNext, Coming soon, Q1 2027, de stores: `OutroText.tsx`, teksten in `outro` in site.ts); de volgende scroll gaat door naar de call-to-action.
- Camera: de bovenkant van de telefoon blijft altijd onder de header. Past hij ingezoomd niet, dan valt de onderkant duidelijk weg (minstens 15%); bij een randje zoomt hij vanzelf verder in (`focusPose` in showcaseMotion.ts).
- De horizontale positie zit op de perspectieflaag (float), zodat het perspectief met de telefoon meeschuift en de melding recht op je af komt.
- Ingezoomd kijkt hij recht naar je toe. Los van de scroll zweeft hij een paar pixels, en met een muis kantelt hij mee en veert terug als de muis stilligt.
- **Scherpte**: een schuine 3D-laag wordt door de GPU uitgesmeerd, en Chrome tekent een 3D-laag niet scherper als je inzoomt. Daarom staat de telefoon in rust recht, en is hij in de layout 1,5× zo groot en verkleind in de transform (`renderScale` in `showcaseMotion.ts`). Zoom je verder dan 1,5, verhoog dan ook `renderScale`.
- Telefoon en tekst naast elkaar vanaf 1024 px breed, of liggend vanaf 768 px (Tailwind-variant `wide` in `index.css`). Daaronder staat de telefoon boven en de tekst eronder.
- Met `prefers-reduced-motion` krijg je `StaticShowcase`: dezelfde stappen onder elkaar, zonder pin of animatie.
- Alleen `transform` en `opacity` worden geanimeerd; `useGSAP` ruimt de timeline en ScrollTrigger op bij unmount.
