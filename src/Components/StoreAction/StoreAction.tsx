import type { ReactNode } from 'react';

import type { ClickSource } from 'shared/siteApi';
import { storeLinks } from 'src/Content/site';
import { useDialogs } from 'src/Hooks/useDialogs';
import { trackClick } from 'src/Logic/Api/siteApi';

interface IProps {
    store: 'appStore' | 'googlePlay';
    // Waar op de pagina de knop staat: gaat mee naar de teller en de wachtlijst.
    source: ClickSource;
    className: string;
    ariaLabel?: string;
    children: ReactNode;
}

// Elke store-knop op de pagina. Telt de klik (downloadbereidheid). Zolang de app nog niet in de store staat (storeLinks leeg),
// is het een knop die de wachtlijst opent; staat de link erin, dan wordt het vanzelf een gewone link naar de store.
export default function StoreAction(props: IProps) {
    const { store, source, className, ariaLabel, children } = props;

    const { openWaitlist } = useDialogs();
    const href = storeLinks[store];

    if (href) {
        return (
            <a href={href} aria-label={ariaLabel} onClick={() => trackClick(store, source)} className={className}>
                {children}
            </a>
        );
    }

    return (
        <button
            type='button'
            aria-label={ariaLabel}
            aria-haspopup='dialog'
            onClick={() => {
                trackClick(store, source);
                openWaitlist(source);
            }}
            className={`cursor-pointer ${className}`}
        >
            {children}
        </button>
    );
}
