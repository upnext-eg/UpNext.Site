import { createContext } from 'react';

import type { ClickSource } from 'shared/siteApi';

export interface DialogsContextValue {
    // Opent de wachtlijst; de bron (waar de knop stond) gaat mee naar de opslag.
    openWaitlist: (source: ClickSource) => void;
    openPrivacy: () => void;
}

export const DialogsContext = createContext<DialogsContextValue | null>(null);
