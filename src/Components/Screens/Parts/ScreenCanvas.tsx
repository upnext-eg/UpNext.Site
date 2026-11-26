import type { ReactNode } from 'react';

import Icon from 'src/Components/Icon/Icon';

interface IProps {
    // De klok in de statusbalk: zo loopt de avond door terwijl je scrolt.
    time: string;
    footer?: ReactNode;
    children: ReactNode;
}

// Een app-scherm op 390 × 844: de achtergrond van ScreenBackground, de statusbalk, de inhoud en eventueel de roze footer.
export default function ScreenCanvas(props: IProps) {
    const { time, footer, children } = props;

    return (
        <div className='bg-app relative flex h-[844px] w-[390px] flex-col overflow-hidden text-[17px] leading-[1.55] font-semibold text-white'>
            <div className='flex h-[54px] shrink-0 items-center justify-between pt-[6px] pr-[32px] pl-[40px]'>
                <span className='text-[16px] leading-none font-extrabold'>{time}</span>
                <span className='flex items-center gap-[5px]'>
                    <Icon name='signal-cellular-3' size={18} />
                    <Icon name='wifi' size={18} />
                    <Icon name='battery' size={18} className='rotate-90' />
                </span>
            </div>
            <div className='flex min-h-0 grow flex-col gap-[16px] px-[24px] pt-[8px]'>{children}</div>
            {footer}
            {/* De home-indicator van iOS, onderaan over de footer heen. */}
            <span className='absolute bottom-[8px] left-1/2 z-[2] h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-midnight' />
        </div>
    );
}
