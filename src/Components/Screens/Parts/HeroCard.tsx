import type { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

// De roze kaart met de gele hoek, het herkenningsteken van de app.
export default function HeroCard(props: IProps) {
    const { children } = props;

    return (
        <div className='rounded-card-shape bg-hero-card shadow-card relative flex shrink-0 flex-col gap-[10px] overflow-hidden p-[20px] text-purple'>
            <span
                aria-hidden='true'
                className='absolute top-0 right-0 size-[72px] bg-yellow [clip-path:polygon(0_0,100%_0,100%_100%)]'
            />
            {children}
        </div>
    );
}
