import Icon from 'src/Components/Icon/Icon';
import { showcase } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

// De scroll-hint aan de rechterkant, naast de scrollbalk: staande tekst met een streepje dat naar beneden loopt. Aan de zijkant valt hij niet weg achter de balk van Safari onderin.
// Verticaal gecentreerd zonder translate (die zou GSAP omzetten naar vaste pixels): smal midden in het vak van de telefoon, breed midden op het scherm.
// ScrollShowcase laat hem verschijnen als je stilstaat en zet data-tone: geel op paars, indigo op het geel van het UP NEXT-moment.
export default function ScrollHint() {
    const { t } = useLanguage();

    return (
        <div
            data-scroll-hint
            data-surface-ignore
            aria-hidden='true'
            className='pointer-events-none absolute top-[4.5rem] right-4 bottom-(--text-area) z-20 my-auto flex h-fit flex-col items-center gap-3 text-yellow data-[tone=light]:text-indigo wide:inset-y-0 wide:right-6'
        >
            <span className='text-[0.6875rem] font-extrabold tracking-[0.2em] whitespace-nowrap uppercase [writing-mode:vertical-rl] wide:text-xs'>
                {t(showcase.scrollHint)}
            </span>
            <span className='relative h-12 w-0.5 overflow-hidden rounded-full bg-current/25'>
                <span className='absolute inset-x-0 top-0 h-1/2 rounded-full bg-current motion-safe:animate-scroll-line' />
            </span>
            <Icon name='chevron-down' size={18} className='-mt-1.5 motion-safe:animate-scroll-hint' />
        </div>
    );
}
