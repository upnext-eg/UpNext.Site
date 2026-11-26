import type { ClickSource } from 'shared/siteApi';
import Icon from 'src/Components/Icon/Icon';
import type { IconName } from 'src/Components/Icon/Icon';
import StoreAction from 'src/Components/StoreAction/StoreAction';

type StoreButtonTone = 'indigo' | 'midnight';

interface IProps {
    store: 'appStore' | 'googlePlay';
    source: ClickSource;
    // De tekst van de echte store-badges: "Download on the" en "Get it on".
    overline: string;
    name: string;
    icon: IconName;
    // indigo op het roze van de call-to-action; midnight op paars (de banner in de showcase), donker zoals de echte badges.
    tone?: StoreButtonTone;
    // Kleiner, zodat er op een telefoon twee naast elkaar passen.
    isCompact?: boolean;
}

const tones: Record<StoreButtonTone, string> = {
    indigo: 'bg-indigo hover:bg-navy focus-visible:outline-indigo',
    midnight: 'bg-midnight ring-1 ring-lavender/25 ring-inset hover:bg-navy',
};

// PrimaryButton uit de app, met icoon en de tekst van de store-badge.
export default function StoreButton(props: IProps) {
    const { store, source, overline, name, icon, tone = 'indigo', isCompact = false } = props;

    const size = isCompact
        ? 'min-h-13 gap-2 pr-4.5 pl-3.5 wide:min-h-16 wide:gap-3 wide:pr-7 wide:pl-6'
        : 'min-h-16 gap-3 pr-7 pl-6 max-sm:w-full';

    return (
        <StoreAction
            store={store}
            source={source}
            ariaLabel={`${overline} ${name}`}
            className={`flex items-center justify-center rounded-full text-white transition-[transform,background-color] hover:-translate-y-0.5 sm:justify-start ${size} ${tones[tone]}`}
        >
            <Icon name={icon} size={30} className={isCompact ? 'size-6 wide:size-[30px]' : ''} />
            <span className='flex flex-col items-start leading-[1.1] whitespace-nowrap'>
                <span className={`font-semibold text-pink ${isCompact ? 'text-[0.6875rem] wide:text-xs' : 'text-xs'}`}>
                    {overline}
                </span>
                <span
                    className={`font-extrabold ${isCompact ? 'text-[1.0625rem] wide:text-[1.1875rem]' : 'text-[1.1875rem]'}`}
                >
                    {name}
                </span>
            </span>
        </StoreAction>
    );
}
