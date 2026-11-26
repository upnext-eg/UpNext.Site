import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import type { ClickSource } from 'shared/siteApi';
import { DialogsContext } from 'src/Logic/Dialogs/DialogsContext';

import PrivacyDialog from './PrivacyDialog';
import WaitlistDialog from './WaitlistDialog';

interface IProps {
    children: ReactNode;
}

// Eén plek voor de popups: elke knop op de pagina opent ze via useDialogs().
// De privacyverklaring kan boven de wachtlijst opengaan; sluit je hem, dan sta je weer in het formulier.
export default function DialogsProvider(props: IProps) {
    const { children } = props;

    const [waitlistSource, setWaitlistSource] = useState<ClickSource | null>(null);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

    const value = useMemo(
        () => ({
            openWaitlist: (source: ClickSource) => setWaitlistSource(source),
            openPrivacy: () => setIsPrivacyOpen(true),
        }),
        [],
    );

    return (
        <DialogsContext.Provider value={value}>
            {children}
            <WaitlistDialog
                source={waitlistSource}
                onClose={() => setWaitlistSource(null)}
                onOpenPrivacy={() => setIsPrivacyOpen(true)}
            />
            <PrivacyDialog isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        </DialogsContext.Provider>
    );
}
