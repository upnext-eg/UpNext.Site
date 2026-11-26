import Icon from 'src/Components/Icon/Icon';
import type { IconName } from 'src/Components/Icon/Icon';

interface IProps {
    // null zolang de app nog niet in de store staat: dan geen link, en de bovenregel zegt "Coming soon".
    href: string | null;
    overline: string;
    name: string;
    icon: IconName;
}

const shape =
    'flex min-h-16 items-center justify-center gap-3 rounded-full bg-indigo pr-7 pl-6 text-white max-sm:w-full sm:justify-start';

// PrimaryButton tone='indigo' uit de app: de hoofdknop op een roze vlak.
export default function StoreButton(props: IProps) {
    const { href, overline, name, icon } = props;

    const content = (
        <>
            <Icon name={icon} size={30} />
            <span className='flex flex-col items-start leading-[1.1]'>
                <span className='text-xs font-semibold text-pink'>{overline}</span>
                <span className='text-[1.1875rem] font-extrabold'>{name}</span>
            </span>
        </>
    );

    if (!href) {
        return (
            <span aria-disabled='true' className={shape}>
                {content}
            </span>
        );
    }

    return (
        <a
            href={href}
            aria-label={`${overline} ${name}`}
            className={`${shape} transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-navy focus-visible:outline-indigo`}
        >
            {content}
        </a>
    );
}
