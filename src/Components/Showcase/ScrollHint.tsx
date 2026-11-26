import Icon from 'src/Components/Icon/Icon';
import { showcase } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

// Een subtiele hint onderaan de opening dat je moet scrollen. Gecentreerd zonder translate: die zou GSAP omzetten naar vaste pixels. De timeline laat hem verdwijnen zodra je begint (en terugkomen bovenaan).
export default function ScrollHint() {
    const { t } = useLanguage();

    return (
        <div
            data-scroll-hint
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 bottom-1.5 z-20 mx-auto flex w-fit items-center gap-1.5 text-xs font-extrabold whitespace-nowrap text-pink wide:bottom-6 wide:text-sm'
        >
            {t(showcase.scrollHint)}
            <Icon name='chevron-down' size={18} className='motion-safe:animate-scroll-hint' />
        </div>
    );
}
