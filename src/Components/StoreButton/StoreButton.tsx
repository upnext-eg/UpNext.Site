import type { ClickSource } from 'shared/siteApi';
import Icon from 'src/Components/Icon/Icon';
import type { IconName } from 'src/Components/Icon/Icon';
import StoreAction from 'src/Components/StoreAction/StoreAction';

interface IProps {
    store: 'appStore' | 'googlePlay';
    source: ClickSource;
    // "Download on the" als de app in de store staat, anders "Coming soon to the".
    overline: string;
    name: string;
    icon: IconName;
}

// PrimaryButton tone='indigo' uit de app: de hoofdknop op een roze vlak.
export default function StoreButton(props: IProps) {
    const { store, source, overline, name, icon } = props;

    return (
        <StoreAction
            store={store}
            source={source}
            ariaLabel={`${overline} ${name}`}
            className='flex min-h-16 items-center justify-center gap-3 rounded-full bg-indigo pr-7 pl-6 text-white transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-navy focus-visible:outline-indigo max-sm:w-full sm:justify-start'
        >
            <Icon name={icon} size={30} />
            <span className='flex flex-col items-start leading-[1.1]'>
                <span className='text-xs font-semibold text-pink'>{overline}</span>
                <span className='text-[1.1875rem] font-extrabold'>{name}</span>
            </span>
        </StoreAction>
    );
}
