import type { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

// De gebogen roze footer (CurvedFooter in de app) met de hoofdactie van het scherm. Ligt boven de inhoud: wat doorloopt, schuift eronder.
export default function PinkFooter(props: IProps) {
    const { children } = props;

    return (
        <div className='bg-pink-footer shadow-footer relative z-[1] flex h-[92px] shrink-0 items-center rounded-t-[50%_26px] px-[24px] pt-[6px]'>
            {children}
        </div>
    );
}
