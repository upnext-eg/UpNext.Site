import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

import { meta } from 'src/Content/site';
import { LanguageContext } from 'src/Logic/Language/LanguageContext';
import { getInitialLanguage, storeLanguage } from 'src/Logic/Language/languageStorage';
import type { Language } from 'src/Logic/Language/Localized';

interface IProps {
    children: ReactNode;
}

export default function LanguageProvider(props: IProps) {
    const { children } = props;

    const [language, setLanguageState] = useState<Language>(getInitialLanguage);

    // De taal van de pagina, de titel en de beschrijving lopen mee met de keuze.
    useEffect(() => {
        document.documentElement.lang = language;
        document.title = meta.title[language];
        document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description[language]);
    }, [language]);

    const value = useMemo(
        () => ({
            language,
            setLanguage: (next: Language) => {
                storeLanguage(next);
                setLanguageState(next);
            },
        }),
        [language],
    );

    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
