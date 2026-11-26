import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

import PhoneCallout from 'src/Components/PhoneMockup/PhoneCallout';
import PhoneMockup from 'src/Components/PhoneMockup/PhoneMockup';
import PhoneScreen from 'src/Components/PhoneMockup/PhoneScreen';
import type { FlowStep, PhonePosition } from 'src/Content/happyFlow';
import { showcase } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';
import { gsap, ScrollTrigger, useGSAP } from 'src/Logic/gsap';

import { arrivalPose, focusPose, offsetMax, offsetRatio, poseVars, renderScale, wideQuery } from './showcaseMotion';
import type { Measure } from './showcaseMotion';
import OutroText from './OutroText';
import ScrollHint from './ScrollHint';
import StepText from './StepText';

// Scrollafstand per tijdseenheid van de timeline, in schermhoogtes (een gewone stap is 1,7 eenheden: 0,85 schermhoogte).
const scrollPerUnit = 0.5;

// Tijden binnen de timeline (relatief: scrub koppelt ze aan de scrollafstand).
const timing = {
    travel: 1.2,
    textOut: 0.25,
    textIn: 0.5,
    hold: 0.5,
    // Het UP NEXT-moment blijft wat langer staan.
    upNextHold: 1,
    // Na de laatste stap: de telefoon schuift terug naar het midden, de banner verschijnt eromheen, daarna loopt de pagina door naar de call-to-action.
    outro: 2,
};

// Tekst op geel verdwijnt met een wipe naar boven: indigo dat over geel uitfadet, wordt modderig.
const wipeShown = 'inset(0% 0% 0% 0%)';
const wipeHidden = 'inset(0% 0% 100% 0%)';

// Tekst en schermdelen komen binnen met een rustige uitloop, zonder overshoot.
const arrive = 'expo.out';

const stageStyle = {
    '--phone-offset': `min(${offsetRatio * 100}%, ${offsetMax}px)`,
} as CSSProperties;

// Binnen de telefoon geldt een groter --phone-w (zie renderScale); de tekstkolommen rekenen met het zichtbare formaat op de stage.
const phoneRenderStyle = {
    '--phone-w': `calc(var(--phone-h) * 0.48 * ${renderScale})`,
} as CSSProperties;

const textBase =
    'absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-4 px-4 pb-8 text-center wide:gap-6 wide:pb-0';

// Tekst aan de kant tegenover de telefoon: tussen de rand van de telefoon en de rand van het scherm.
const textClasses: Record<PhonePosition, string> = {
    left: `${textBase} wide:inset-y-0 wide:right-(--page-pad) wide:left-[calc(50%_-_var(--phone-offset)_+_var(--phone-w)/2_+_var(--text-gap))] wide:justify-center wide:items-start wide:text-left`,
    right: `${textBase} wide:inset-y-0 wide:left-(--page-pad) wide:right-[calc(50%_-_var(--phone-offset)_+_var(--phone-w)/2_+_var(--text-gap))] wide:justify-center wide:items-start wide:text-left`,
    center: `${textBase} wide:inset-0 wide:grid wide:grid-cols-[1fr_var(--phone-w)_1fr] wide:items-center wide:gap-x-(--text-gap) wide:px-(--page-pad) wide:text-left`,
};

interface IProps {
    steps: FlowStep[];
}

export default function ScrollShowcase(props: IProps) {
    const { steps } = props;

    const { language, t } = useLanguage();

    const sectionRef = useRef<HTMLElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const moveRef = useRef<HTMLDivElement>(null);
    const floatRef = useRef<HTMLDivElement>(null);
    const tiltRef = useRef<HTMLDivElement>(null);
    const phoneRef = useRef<HTMLDivElement>(null);
    const floodRef = useRef<HTMLDivElement>(null);
    const wordRef = useRef<HTMLDivElement>(null);

    useGSAP(
        (_context, contextSafe) => {
            const section = sectionRef.current;
            const stage = stageRef.current;
            const move = moveRef.current;
            const float = floatRef.current;
            const tilt = tiltRef.current;
            const phone = phoneRef.current;
            const flood = floodRef.current;
            const word = wordRef.current;
            if (!section || !stage || !move || !float || !tilt || !phone || !flood || !word) {
                return;
            }

            const screens = gsap.utils.toArray<HTMLElement>('[data-screen]', stage);
            const texts = gsap.utils.toArray<HTMLElement>('[data-step-text]', stage);
            const glare = stage.querySelector('[data-glare]');
            const partsOf = (index: number) => texts[index].querySelectorAll('[data-text-part]');

            // Bij elke refresh (resize) opnieuw gemeten; offsetWidth negeert de transforms van GSAP.
            const header = document.querySelector('header');
            const measure = (): Measure => {
                const isWide = window.matchMedia(wideQuery).matches;

                return {
                    isWide,
                    stageWidth: stage.clientWidth,
                    phoneWidth: phone.offsetWidth / renderScale,
                    phoneHeight: phone.offsetHeight / renderScale,
                    // float vult het vak van de telefoon: op een breed scherm de hele stage, smal het vak boven de tekst.
                    regionHeight: float.clientHeight,
                    // Breed ligt de vaste header over de stage; smal begint het vak er al onder.
                    topInset: isWide ? (header?.offsetHeight ?? 72) + 16 : 16,
                };
            };
            const arrival = (index: number) => arrivalPose(steps[index], index, measure());
            const focus = (index: number) => focusPose(steps[index], index, measure());

            // Alleen opacity (geen visibility): zo blijft elke stap leesbaar voor een screenreader.
            gsap.set(screens.slice(1), { autoAlpha: 0 });
            // Ook callouts vooraf via GSAP verbergen: terugscrollen voorbij een tween zet de waarden van vóór die tween terug, en een CSS-class kent GSAP niet.
            gsap.set(gsap.utils.toArray<HTMLElement>('[data-callout]', stage), { autoAlpha: 0, y: -40 });
            texts.slice(1).forEach((_text, offset) => gsap.set(partsOf(offset + 1), { opacity: 0, y: 24 }));
            const outroParts = stage.querySelectorAll('[data-outro] [data-text-part]');
            const scrollHint = stage.querySelector('[data-scroll-hint]');
            gsap.set(outroParts, { opacity: 0, y: 24 });
            steps.forEach((step, index) => step.isUpNextMoment && gsap.set(partsOf(index), { clipPath: wipeShown }));
            // Centreren via GSAP: een CSS-translate zou GSAP één keer in pixels uitlezen.
            gsap.set([flood, word], { xPercent: -50, yPercent: -50 });
            gsap.set(flood, { scale: 0 });
            gsap.set(word, { opacity: 0, scale: 0.6 });

            const timeline = gsap.timeline({
                defaults: { ease: 'power2.inOut' },
                scrollTrigger: {
                    trigger: stage,
                    start: 'top top',
                    end: () => `+=${window.innerHeight * scrollPerUnit * timeline.duration()}`,
                    pin: true,
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            });

            // De x van de telefoon zit op float, de perspectieflaag zelf: zo schuift het perspectief mee en komt wat naar voren komt (de melding) recht op je af, ook als de telefoon opzij staat.
            const opening = poseVars(() => focus(0));
            timeline
                .set(float, { x: opening.x })
                .set(move, {
                    y: opening.y,
                    scale: opening.scale,
                    rotationX: opening.rotationX,
                    rotationY: opening.rotationY,
                    rotationZ: opening.rotationZ,
                })
                .to({}, { duration: timing.hold * 0.6 });

            // De scroll-hint verdwijnt zodra je begint te scrollen, en komt terug als je weer helemaal bovenaan bent.
            if (scrollHint) {
                timeline.to(scrollHint, { autoAlpha: 0, y: 8, duration: 0.2, ease: 'power1.in' }, 0.02);
            }

            steps.slice(1).forEach((step, offset) => {
                const previous = offset;
                const next = offset + 1;
                const at = timeline.duration();
                const half = timing.travel / 2;
                // De zwiep gaat de kant op waar hij heen reist; staat hij op een smal scherm stil, dan om en om.
                const swing = () => Math.sign(arrival(next).x - arrival(previous).x) || (next % 2 === 0 ? 1 : -1);

                // De camera schuift en zoomt in één beweging van het ene focuspunt naar het volgende: geen tussenstap naar achteren.
                const { x, y, scale } = poseVars(() => focus(next));
                timeline
                    .to(float, { x, duration: timing.travel }, at)
                    .to(move, { y, scale, duration: timing.travel }, at);

                // Onderweg leunt hij naar de nieuwe kant, en kijkt hij bij aankomst recht in de camera (scherpe tekst).
                timeline
                    .to(
                        move,
                        {
                            rotationX: () => arrival(next).rotationX * 0.6,
                            rotationY: () => arrival(next).rotationY * 0.6,
                            rotationZ: () => swing() * 4,
                            duration: half,
                            ease: 'sine.inOut',
                        },
                        at,
                    )
                    .to(
                        move,
                        {
                            rotationX: () => focus(next).rotationX,
                            rotationY: () => focus(next).rotationY,
                            rotationZ: () => focus(next).rotationZ,
                            duration: half,
                            ease: 'sine.inOut',
                        },
                        at + half,
                    );

                if (glare) {
                    timeline.fromTo(
                        glare,
                        { xPercent: -30 },
                        { xPercent: 30, duration: timing.travel, ease: 'none', immediateRender: false },
                        at,
                    );
                }

                // Schermen wisselen halverwege de reis.
                timeline
                    .to(screens[previous], { autoAlpha: 0, duration: 0.3 }, at + 0.35)
                    .fromTo(
                        screens[next],
                        { autoAlpha: 0 },
                        { autoAlpha: 1, duration: 0.35, immediateRender: false },
                        at + 0.4,
                    );

                // Tekst: weg is sneller dan binnenkomen.
                if (steps[previous].isUpNextMoment) {
                    // Het geel trekt zich terug: woord weg, vloed krimpt terug naar de telefoon, tekst wipet weg.
                    timeline
                        .to(partsOf(previous), { clipPath: wipeHidden, y: -24, duration: 0.3, ease: 'power2.in' }, at)
                        .to(word, { opacity: 0, scale: 1.2, duration: 0.35, ease: 'power2.in' }, at)
                        .to(flood, { scale: 0, duration: 0.5 }, at);
                } else {
                    timeline.to(
                        partsOf(previous),
                        { opacity: 0, y: -16, duration: timing.textOut, ease: 'power2.in' },
                        at,
                    );
                }
                timeline.fromTo(
                    partsOf(next),
                    { opacity: 0, y: 24 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.06,
                        duration: timing.textIn,
                        ease: arrive,
                        immediateRender: false,
                    },
                    at + timing.travel - 0.4,
                );

                const reveals = screens[next].querySelectorAll('[data-reveal]');
                if (reveals.length > 0) {
                    timeline.from(
                        reveals,
                        { y: 16, autoAlpha: 0, stagger: 0.05, duration: 0.4, ease: arrive, immediateRender: false },
                        at + 0.5,
                    );
                }

                // Een callout zakt terug in het scherm zodra de telefoon weer gaat reizen.
                const previousCallout = stage.querySelector(`[data-callout="${steps[previous].id}"]`);
                if (previousCallout) {
                    const source = screens[previous].querySelector('[data-callout-source]');
                    timeline
                        .to(
                            previousCallout,
                            { y: -40, z: 0, scale: 1, rotationX: 0, duration: 0.25, ease: 'power2.in' },
                            at,
                        )
                        .set(previousCallout, { autoAlpha: 0 }, at + 0.25);
                    if (source) {
                        timeline.set(source, { opacity: 1 }, at + 0.25);
                    }
                }

                // ... en komt los uit het scherm naar je toe als de telefoon er staat.
                const callout = stage.querySelector(`[data-callout="${step.id}"]`);
                if (callout) {
                    const liftAt = at + timing.travel * 0.85;
                    const source = screens[next].querySelector('[data-callout-source]');
                    // Valt van boven in het scherm (zoals een pushmelding) en komt dan naar je toe.
                    timeline.fromTo(
                        callout,
                        { autoAlpha: 0, y: -40, z: 0, scale: 1, rotationX: 0 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            // In de ruimte van de telefoon, dus vóór het verkleinen met renderScale.
                            z: () => phone.offsetWidth * 0.35,
                            scale: 1.1,
                            rotationX: -6,
                            duration: 0.6,
                            ease: arrive,
                            immediateRender: false,
                        },
                        liftAt,
                    );
                    if (source) {
                        timeline.set(source, { opacity: 0 }, liftAt);
                    }
                }

                if (step.isUpNextMoment) {
                    // Het UP NEXT-moment uit UpNext.Onepager: het beeld loopt geel vol vanuit de telefoon (geel is in de app de kleur van jouw beurt),
                    // "UP NEXT!" verschijnt erachter, de melding valt binnen en de telefoon schudt.
                    const shakeAt = at + timing.travel * 0.85 + 0.2;
                    timeline
                        .set([flood, word], { x: () => arrival(next).x }, at)
                        .to(flood, { scale: 1, duration: 0.6, ease: 'power2.in' }, at + 0.1)
                        .to(word, { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }, at + 0.35)
                        .to(
                            tilt,
                            { keyframes: { rotation: [0, -6, 6, -5, 5, -3, 3, 0] }, duration: 0.4, ease: 'none' },
                            shakeAt,
                        );
                }

                timeline.to({}, { duration: step.isUpNextMoment ? timing.upNextHold : timing.hold });
            });

            // Slot: tekst weg, telefoon recht en heel in beeld terug naar het midden; daarna loopt de pagina door naar de call-to-action.
            const outroAt = timeline.duration();
            timeline
                .to(
                    partsOf(steps.length - 1),
                    { opacity: 0, y: -16, duration: timing.textOut, ease: 'power2.in' },
                    outroAt,
                )
                .to(float, { x: 0, duration: 0.7 }, outroAt)
                .to(
                    move,
                    {
                        y: 0,
                        scale: 1 / renderScale,
                        rotationX: 0,
                        rotationY: 0,
                        rotationZ: 0,
                        duration: 0.7,
                    },
                    outroAt,
                )
                // De banner verschijnt rond de telefoon en blijft even staan voordat de pagina doorloopt.
                .fromTo(
                    outroParts,
                    { opacity: 0, y: 24 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: timing.textIn, ease: arrive, immediateRender: false },
                    outroAt + 0.5,
                )
                .to({}, { duration: timing.outro - 0.5 - timing.textIn - 0.1 });

            // Los van de scroll zweeft de telefoon een paar pixels. Alleen een 2D-verschuiving buiten de 3D-ruimte: een draaiende 3D-laag tekent Chrome niet opnieuw scherp, en dan wordt de ingezoomde schermtekst wazig.
            const idle = [
                gsap.fromTo(float, { y: -4 }, { y: 4, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 }),
            ];
            ScrollTrigger.create({
                trigger: section,
                start: 'top bottom',
                end: 'bottom top',
                onToggle: (self) => idle.forEach((tween) => (self.isActive ? tween.resume() : tween.pause())),
            });

            // Met een muis kantelt de telefoon mee met de cursor, en veert terug als de muis stilligt: een schuine laag blijft wazig.
            let removePointer: (() => void) | undefined;
            if (contextSafe && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                const toRotationY = gsap.quickTo(tilt, 'rotationY', { duration: 0.9, ease: 'power3' });
                const toRotationX = gsap.quickTo(tilt, 'rotationX', { duration: 0.9, ease: 'power3' });
                const settle = gsap.delayedCall(0.6, () => {
                    toRotationY(0);
                    toRotationX(0);
                });
                const onPointerMove = contextSafe((event: PointerEvent) => {
                    toRotationY((event.clientX / window.innerWidth - 0.5) * 12);
                    toRotationX((event.clientY / window.innerHeight - 0.5) * -8);
                    settle.restart(true);
                });
                window.addEventListener('pointermove', onPointerMove);
                removePointer = () => window.removeEventListener('pointermove', onPointerMove);
            }

            // Anton en Manrope veranderen de tekstmaten als ze binnen zijn: daarna opnieuw meten.
            document.fonts.ready.then(() => ScrollTrigger.refresh());

            return () => removePointer?.();
        },
        { scope: sectionRef, dependencies: [steps] },
    );

    // Een taalwissel verandert alleen de teksten, niet de elementen: opnieuw meten is genoeg. Opnieuw opbouwen zou de telefoon vanaf de eerste stap laten terugvliegen.
    useEffect(() => {
        ScrollTrigger.refresh();
    }, [language]);

    return (
        <section ref={sectionRef} aria-label={t(showcase.label)} id='zo-werkt-het'>
            <div
                ref={stageRef}
                style={stageStyle}
                className='relative h-lvh overflow-hidden [--page-pad:clamp(1.5rem,5vw,5rem)] [--phone-h:clamp(220px,calc(100svh-24.5rem),600px)] [--phone-w:calc(var(--phone-h)*0.48)] [--text-area:18rem] [--text-gap:clamp(1.5rem,4vw,4rem)] wide:[--phone-h:min(74svh,720px)]'
            >
                {/* Het UP NEXT-moment: een gele cirkel die vanuit de telefoon het hele beeld vult, met "UP NEXT!" erachter. Alleen scale en opacity. */}
                <div aria-hidden='true' className='pointer-events-none absolute inset-0 overflow-hidden'>
                    <div
                        ref={floodRef}
                        className='absolute top-[calc(4.5rem+(100svh-4.5rem-var(--text-area))/2)] left-1/2 size-[300vmax] rounded-full bg-yellow will-change-transform wide:top-[50svh]'
                    />
                    {/* Achter de telefoon, niet achter de tekst, en toon-op-toon licht: een vol indigo woord eronder maakt de stapteksten lastig leesbaar. */}
                    <div
                        ref={wordRef}
                        className='font-display absolute top-[calc(4.5rem+(100svh-4.5rem-var(--text-area))/2)] left-1/2 text-[24vw] leading-[0.86] whitespace-nowrap text-indigo/7 uppercase will-change-transform wide:top-[50svh]'
                    >
                        Up next!
                    </div>
                </div>
                {/* De inhoud blijft binnen de kleinste schermhoogte (svh): met de browserbalken uitgeklapt valt er niets achter. Is het scherm hoger, dan loopt alleen de achtergrond door. */}
                <div className='absolute inset-x-0 top-0 h-svh'>
                    {/* Op een smal scherm een eigen vak boven de tekst: ingezoomd valt de telefoon daar zacht weg in plaats van over de tekst. */}
                    <div className='absolute inset-x-0 top-[4.5rem] bottom-(--text-area) [mask-image:linear-gradient(to_bottom,transparent,black_1rem,black_calc(100%-2.5rem),transparent)] wide:inset-0 wide:[mask-image:none]'>
                        <div
                            ref={floatRef}
                            className='absolute inset-0 flex items-center justify-center perspective-[1600px]'
                        >
                            <div ref={moveRef} className='transform-3d'>
                                <div ref={tiltRef} style={phoneRenderStyle} className='transform-3d'>
                                    <PhoneMockup
                                        ref={phoneRef}
                                        overlay={steps.map(
                                            (step) =>
                                                step.callout && (
                                                    <PhoneCallout key={step.id} id={step.callout} stepId={step.id} />
                                                ),
                                        )}
                                    >
                                        {steps.map((step) => (
                                            <div key={step.id} data-screen className='absolute inset-0'>
                                                <PhoneScreen step={step} />
                                            </div>
                                        ))}
                                    </PhoneMockup>
                                </div>
                            </div>
                        </div>
                    </div>
                    {steps.map((step, index) => (
                        <StepText
                            key={step.id}
                            step={step}
                            index={index}
                            variant={step.phone === 'center' ? 'split' : 'side'}
                            className={textClasses[step.phone]}
                        />
                    ))}
                    <OutroText className={textClasses.center} />
                    <ScrollHint />
                </div>
            </div>
        </section>
    );
}
