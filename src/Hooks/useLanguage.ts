import { useCallback, useContext } from 'react';

import { LanguageContext } from 'src/Logic/Language/LanguageContext';
import type { Localized } from 'src/Logic/Language/Localized';

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage moet binnen LanguageProvider gebruikt worden');
    }

    const { language } = context;

    // t(tekst) kiest de vertaling in de huidige taal.
    const t = useCallback(<T>(text: Localized<T>) => text[language], [language]);

    return { ...context, t };
}
