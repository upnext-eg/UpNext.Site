import { useContext } from 'react';

import { DialogsContext } from 'src/Logic/Dialogs/DialogsContext';

export function useDialogs() {
    const context = useContext(DialogsContext);
    if (!context) {
        throw new Error('useDialogs moet binnen DialogsProvider gebruikt worden');
    }

    return context;
}
