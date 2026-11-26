import { useLayoutEffect, useRef } from 'react';
import type { ReactNode, Ref } from 'react';

import { screenWidth } from 'src/Components/Screens/screens';

// De dikte van de telefoon: plakjes achter de voorkant. Kantelt hij, dan vormen ze samen de zijkant.
const edgeSlices = Array.from({ length: 6 }, (_, index) => index + 1);
const sliceDepth = 0.008;

const frameRadius = 'rounded-[calc(var(--phone-w)*0.16)]';

interface IProps {
    ref?: Ref<HTMLDivElement>;
    className?: string;
    // Boven het scherm, in dezelfde 3D-ruimte: voor callouts die naar voren komen.
    overlay?: ReactNode;
    children: ReactNode;
}

// De breedte komt van --phone-w op een ouder; de schermen erin worden naar die breedte geschaald.
export default function PhoneMockup(props: IProps) {
    const { ref, className = '', overlay, children } = props;

    const rootRef = useRef<HTMLDivElement>(null);
    const screenRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const root = rootRef.current;
        const screen = screenRef.current;
        if (!root || !screen) {
            return;
        }

        // Placeholders en callouts zijn op 390 px ontworpen: één schaal voor alles in de telefoon.
        const observer = new ResizeObserver(([entry]) => {
            root.style.setProperty('--screen-scale', String(entry.contentRect.width / screenWidth));
        });
        observer.observe(screen);

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`relative w-(--phone-w) transform-3d ${className}`}>
            {edgeSlices.map((slice) => (
                <span
                    key={slice}
                    className={`absolute inset-0 ${frameRadius} ${slice === edgeSlices.length ? 'bg-midnight shadow-[0_50px_90px_-20px] shadow-midnight' : 'bg-navy'}`}
                    style={{ transform: `translateZ(calc(var(--phone-w) * ${-sliceDepth * slice}))` }}
                />
            ))}
            <div
                ref={rootRef}
                className={`relative ${frameRadius} bg-midnight p-[calc(var(--phone-w)*0.035)] ring-1 ring-periwinkle/40 ring-inset transform-3d`}
            >
                <span className='absolute top-[18%] -left-[2px] h-[9%] w-[3px] rounded-l bg-periwinkle/50' />
                <span className='absolute top-[30%] -left-[2px] h-[9%] w-[3px] rounded-l bg-periwinkle/50' />
                <span className='absolute top-[24%] -right-[2px] h-[13%] w-[3px] rounded-r bg-periwinkle/50' />
                <div
                    ref={screenRef}
                    className='relative aspect-[390/844] overflow-hidden rounded-[calc(var(--phone-w)*0.125)] bg-royal-purple'
                >
                    {children}
                    <span
                        data-glare
                        className='pointer-events-none absolute -inset-x-full inset-y-0 z-20 bg-[linear-gradient(105deg,transparent_42%,color-mix(in_srgb,var(--color-white)_16%,transparent)_48%,color-mix(in_srgb,var(--color-white)_4%,transparent)_52%,transparent_58%)]'
                    />
                    <span className='absolute top-[1.3%] left-1/2 z-30 h-[3.7%] w-[31%] -translate-x-1/2 rounded-full bg-black' />
                </div>
                {overlay}
            </div>
        </div>
    );
}
