import { useEffect, useRef } from 'react';
import type { PointerEvent } from 'react';

import { surfaceToneAt } from 'src/Logic/Surface/surfaceTone';

// Kleinste hoogte van het balkje: de pagina is lang (de vastgepinde showcase), anders wordt het een stipje.
const minThumbHeight = 40;
// Na de laatste scroll nog even de kleur bijhouden: de showcase loopt met scrub na, en het geel van het UP NEXT-moment groeit nog.
const followAfterScrollMs = 1000;

// De eigen scrollbalk van de pagina: een dun balkje rechts, geel op paars en paars op geel en roze (zie surfaceToneAt).
// De gewone scrollbalk staat uit (index.css). Scrollen blijft gewoon native; met een muis kun je het balkje ook slepen.
export default function PageScrollbar() {
    const trackRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const thumb = thumbRef.current;
        if (!track || !thumb) {
            return;
        }

        const update = () => {
            const pageHeight = document.documentElement.scrollHeight;
            const scrollable = pageHeight - window.innerHeight;
            track.hidden = scrollable <= 0;
            if (scrollable <= 0) {
                return;
            }

            const trackHeight = track.clientHeight;
            const thumbHeight = Math.max(minThumbHeight, (trackHeight * window.innerHeight) / pageHeight);
            const progress = Math.min(1, Math.max(0, window.scrollY / scrollable));
            thumb.style.height = `${thumbHeight}px`;
            thumb.style.transform = `translateY(${(trackHeight - thumbHeight) * progress}px)`;

            const box = thumb.getBoundingClientRect();
            thumb.dataset.tone = surfaceToneAt(box.left + box.width / 2, box.top + box.height / 2);
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

        // De paginahoogte verandert ook zonder scroll: fonts die binnenkomen, ScrollTrigger die de pin opnieuw opmeet.
        const resizeObserver = new ResizeObserver(wake);
        resizeObserver.observe(document.body);
        window.addEventListener('scroll', wake, { passive: true });
        window.addEventListener('resize', wake);
        wake();

        return () => {
            cancelAnimationFrame(frame);
            resizeObserver.disconnect();
            window.removeEventListener('scroll', wake);
            window.removeEventListener('resize', wake);
        };
    }, []);

    // Slepen met de muis: de afstand van het balkje omrekenen naar de afstand van de pagina.
    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        const track = trackRef.current;
        const thumb = event.currentTarget;
        if (event.button !== 0 || !track) {
            return;
        }
        event.preventDefault();
        thumb.setPointerCapture(event.pointerId);

        const startY = event.clientY;
        const startScroll = window.scrollY;
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = scrollable / Math.max(1, track.clientHeight - thumb.offsetHeight);

        const onMove = (moveEvent: globalThis.PointerEvent) => {
            window.scrollTo(0, startScroll + (moveEvent.clientY - startY) * ratio);
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
        <div
            ref={trackRef}
            data-surface-ignore
            aria-hidden='true'
            className='pointer-events-none fixed top-1 right-1 bottom-1 z-[55] w-2.5'
        >
            <div
                ref={thumbRef}
                onPointerDown={onPointerDown}
                // Het zichtbare balkje is smal; de ::before maakt het grijpvak breder. Op een touchscreen scrol je gewoon de pagina, daar doet het balkje niet mee.
                className='group pointer-events-auto absolute top-0 right-0 flex w-2.5 cursor-grab justify-end before:absolute before:inset-y-0 before:-left-1.5 before:w-4 active:cursor-grabbing [@media(pointer:coarse)]:pointer-events-none'
            >
                <span className='h-full w-1.5 rounded-full bg-yellow/85 transition-[width,background-color] duration-200 group-hover:w-2.5 group-active:w-2.5 group-data-[tone=light]:bg-purple/75' />
            </div>
        </div>
    );
}
