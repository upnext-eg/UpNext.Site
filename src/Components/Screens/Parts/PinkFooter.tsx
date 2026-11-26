import type { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

// De gebogen roze footer, met de maten van CurvedFooter in de app: 92 hoog voor de hoofdactie plus 34 voor de home-indicator van de iPhone,
// de knop gecentreerd in de bovenste 92. Ligt boven de inhoud: wat doorloopt, schuift eronder.
export default function PinkFooter(props: IProps) {
    const { children } = props;

    return (
        <div className='bg-pink-footer shadow-footer relative z-[1] flex h-[126px] shrink-0 items-center rounded-t-[50%_26px] px-[24px] pt-[4px] pb-[34px]'>
            {children}
        </div>
    );
}
