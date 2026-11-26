import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

import Icon from 'src/Components/Icon/Icon';
import Scrollbar from 'src/Components/Scrollbar/Scrollbar';
import { dialogs } from 'src/Content/dialogs';
import { useLanguage } from 'src/Hooks/useLanguage';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    // id van de kop in de popup, voor de screenreader.
    labelledBy: string;
    children: ReactNode;
}

// Een popup in de stijl van de app: paarse achtergrond van een app-scherm, de staarthoek rechtsonder, de ronde roze sluitknop.
// Het native <dialog> (showModal) houdt de focus vast, sluit met Esc en ligt boven alles, ook boven de vastgepinde showcase.
export default function Dialog(props: IProps) {
    const { isOpen, onClose, labelledBy, children } = props;

    const { t } = useLanguage();
    const ref = useRef<HTMLDialogElement>(null);
    const scrollerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) {
            return;
        }
        if (isOpen && !dialog.open) {
            dialog.showModal();
        } else if (!isOpen && dialog.open) {
            dialog.close();
        }
    }, [isOpen]);

    return (
        <dialog
            ref={ref}
            aria-labelledby={labelledBy}
            onClose={onClose}
            onClick={(event) => {
                // Een klik op de achtergrond komt binnen op het dialog-element zelf. Alleen sluiten als hij echt buiten de kaart viel:
                // de marge rond het scrollvak hoort ook bij het dialog-element.
                if (event.target !== event.currentTarget) {
                    return;
                }
                const card = event.currentTarget.getBoundingClientRect();
                const isOutside =
                    event.clientX < card.left ||
                    event.clientX > card.right ||
                    event.clientY < card.top ||
                    event.clientY > card.bottom;
                if (isOutside) {
                    onClose();
                }
            }}
            className='bg-app inset-0 m-auto h-fit max-h-[calc(100dvh-2rem)] w-[min(30rem,calc(100%-2rem))] max-w-none flex-col overflow-hidden rounded-[24px_24px_64px_24px] border border-white/10 p-0 text-white shadow-[0_30px_80px] shadow-midnight/60 backdrop:bg-midnight/75 open:flex motion-safe:open:animate-dialog-in'
        >
            {/* Het scrollvak ligt een eindje binnen de rand, met de eigen gele scrollbalk van de site ernaast: zo valt de balk binnen de ronde hoeken en boven de staart rechtsonder.
                flex-auto, niet flex-1: met basis 0 rekent Safari de hoogte van de popup (h-fit) uit als 0 en klapt de kaart in tot alleen de marges.
                Met basis auto is het vak zo hoog als de inhoud, en krimpt het (min-h-0) pas als de popup tegen max-h aanloopt. */}
            <div
                ref={scrollerRef}
                className='mt-3 mb-10 min-h-0 flex-auto overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
            >
                <div className='relative flex flex-col gap-5 px-6 pt-4 sm:px-9 sm:pt-6'>
                    <button
                        type='button'
                        onClick={onClose}
                        aria-label={t(dialogs.close)}
                        // Sticky: bij een lange tekst (privacyverklaring) blijft de knop in beeld. De negatieve marge haalt zijn ruimte weg, zodat de inhoud ernaast begint.
                        className='sticky top-3 z-10 -mt-2 -mr-2 -mb-[3.75rem] flex size-11 shrink-0 cursor-pointer items-center justify-center self-end rounded-full border-2 border-pink bg-royal-purple text-pink transition-colors hover:bg-pink/14 sm:-mt-4 sm:-mr-4'
                    >
                        <Icon name='close' size={22} />
                    </button>
                    {children}
                </div>
            </div>
            <Scrollbar target={scrollerRef} className='absolute top-3 right-1 bottom-10' />
        </dialog>
    );
}
