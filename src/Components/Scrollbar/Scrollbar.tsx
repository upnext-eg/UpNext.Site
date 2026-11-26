import { useEffect, useRef } from 'react';
import type { PointerEvent, RefObject } from 'react';

import { surfaceToneAt } from 'src/Logic/Surface/surfaceTone';

interface IProps {
    // Het vak dat scrolt; zonder target de pagina zelf. Zet op dat vak ook scrollbar-none (de gewone balk uit).
    target?: RefObject<HTMLElement | null>;
    // Plaats en maat van het spoor: fixed langs de rand van het scherm, of absolute binnen een popup.
    className: string;
    // Kleur kiezen op wat eronder ligt (geel op paars, paars op geel en roze). Zonder: altijd geel, voor een vak dat altijd paars is.
    isToneAware?: boolean;
}

// Kleinste hoogte van het balkje: de pagina is lang (de vastgepinde showcase), anders wordt het een stipje.
const minThumbHeight = 40;
// Na de laatste scroll nog even bijhouden: de showcase loopt met scrub na, en het geel van het UP NEXT-moment groeit nog.
const followAfterScrollMs = 1000;

// Lezen en scrollen, voor de pagina of voor een vak.
function scrollerOf(target: HTMLElement | null) {
    if (!target) {
        return {
            viewport: () => window.innerHeight,
            content: () => document.documentElement.scrollHeight,
            position: () => window.scrollY,
            scrollTo: (y: number) => window.scrollTo(0, y),
            events: window as Window | HTMLElement,
            observed: document.body,
        };
    }

    return {
        viewport: () => target.clientHeight,
        content: () => target.scrollHeight,
        position: () => target.scrollTop,
        scrollTo: (y: number) => {
            target.scrollTop = y;
        },
        events: target as Window | HTMLElement,
        observed: target.firstElementChild ?? target,
    };
}

// De eigen scrollbalk van de site: een dun geel balkje, voor de pagina en in de popups. Scrollen blijft gewoon native; met een muis kun je het balkje ook slepen.
export default function Scrollbar(props: IProps) {
    const { target, className, isToneAware = false } = props;

    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const thumb = thumbRef.current;
        if (!track || !thumb) {
            return;
        }
        const scroller = scrollerOf(target?.current ?? null);

        const update = () => {
            const content = scroller.content();
            const viewport = scroller.viewport();
            const scrollable = content - viewport;
            // Valt er niets te scrollen (een korte popup, of een popup die dicht is), dan geen balkje.
            track.hidden = scrollable <= 1 || viewport <= 0;
            if (track.hidden) {
                return;
            }

            const trackHeight = track.clientHeight;
            const thumbHeight = Math.max(minThumbHeight, (trackHeight * viewport) / content);
            const progress = Math.min(1, Math.max(0, scroller.position() / scrollable));
            thumb.style.height = `${thumbHeight}px`;
            thumb.style.transform = `translateY(${(trackHeight - thumbHeight) * progress}px)`;

            if (isToneAware) {
                const box = thumb.getBoundingClientRect();
                thumb.dataset.tone = surfaceToneAt(box.left + box.width / 2, box.top + box.height / 2);
            }
        };

        // Eén update per frame, en alleen zolang er iets beweegt.
        let frame = 0;
        let followUntil = 0;
        const tick = () => {
            update();
            frame = performance.now() < followUntil ? requestAnimationFrame(tick) : 0;
        };
        const wake = () => {
            followUntil = performance.now() + followAfterScrollMs;
            if (!frame) {
                frame = requestAnimationFrame(tick);
            }
        };

        // De hoogte verandert ook zonder scroll: fonts die binnenkomen, ScrollTrigger die de pin opnieuw opmeet, een popup die opengaat of van taal wisselt.
        const resizeObserver = new ResizeObserver(wake);
        resizeObserver.observe(scroller.observed);
        if (target?.current) {
            resizeObserver.observe(target.current);
        }
        scroller.events.addEventListener('scroll', wake, { passive: true });
        window.addEventListener('resize', wake);
        wake();

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            scroller.events.removeEventListener('scroll', wake);
            window.removeEventListener('resize', wake);
        };
    }, [target, isToneAware]);

    // Slepen met de muis: de afstand van het balkje omrekenen naar de scrollafstand.
    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        const thumb = event.currentTarget;
        if (event.button !== 0 || !track) {
            return;
        }
        event.preventDefault();
        thumb.setPointerCapture(event.pointerId);

        const scroller = scrollerOf(target?.current ?? null);
        const startY = event.clientY;
        const startScroll = scroller.position();
        const scrollable = scroller.content() - scroller.viewport();
        const ratio = scrollable / Math.max(1, track.clientHeight - thumb.offsetHeight);

        const onMove = (moveEvent: globalThis.PointerEvent) => {
            scroller.scrollTo(startScroll + (moveEvent.clientY - startY) * ratio);
        };
        const onUp = () => {
            thumb.removeEventListener('pointermove', onMove);
            thumb.removeEventListener('pointerup', onUp);
            thumb.removeEventListener('pointercancel', onUp);
        };
        thumb.addEventListener('pointermove', onMove);
        thumb.addEventListener('pointerup', onUp);
        thumb.addEventListener('pointercancel', onUp);
    };

    return (
        <div ref={trackRef} data-surface-ignore aria-hidden='true' className={`pointer-events-none w-2.5 ${className}`}>
            <div
                ref={thumbRef}
                onPointerDown={onPointerDown}
                // Het zichtbare balkje is smal; de ::before maakt het grijpvak breder. Op een touchscreen scrol je gewoon het vak, daar doet het balkje niet mee.
                className='group pointer-events-auto absolute top-0 right-0 flex w-2.5 cursor-grab justify-end before:absolute before:inset-y-0 before:-left-1.5 before:w-4 active:cursor-grabbing [@media(pointer:coarse)]:pointer-events-none'
            >
                <span className='h-full w-1.5 rounded-full bg-yellow/85 transition-[width,background-color] duration-200 group-hover:w-2.5 group-active:w-2.5 group-data-[tone=light]:bg-purple/75' />
            </div>
        </div>
    );
}
