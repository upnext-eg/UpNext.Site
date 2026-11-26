import { header } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';
import { languages } from 'src/Logic/Language/Localized';

// light: roze op paars (header); dark: indigo op roze (footer). Actief en inactief sluiten elkaar uit, anders wint de verkeerde tekstkleur.
const tones = {
    light: {
        root: 'border-pink',
        option: 'text-pink hover:bg-pink/14',
        active: 'bg-pink text-indigo',
        focus: 'focus-visible:outline-pink',
    },
    dark: {
        root: 'border-indigo',
        option: 'text-indigo hover:bg-indigo/14',
        active: 'bg-indigo text-pink',
        focus: 'focus-visible:outline-indigo',
    },
} as const;

interface IProps {
    tone?: keyof typeof tones;
}

export default function LanguageToggle(props: IProps) {
    const { tone = 'light' } = props;

    const { language, setLanguage, t } = useLanguage();
    const styles = tones[tone];

    return (
        <div
            role='group'
            aria-label={t(header.languageLabel)}
            className={`inline-flex rounded-full border-2 p-[3px] ${styles.root}`}
        >
            {languages.map((option) => {
                const isActive = option === language;

                return (
                    <button
                        key={option}
                        type='button'
                        lang={option}
                        aria-pressed={isActive}
                        onClick={() => setLanguage(option)}
                        className={`min-h-[38px] min-w-9 cursor-pointer rounded-full px-1.5 text-[0.8125rem] font-extrabold tracking-[0.06em] uppercase transition-colors focus-visible:outline-offset-2 sm:min-w-11 sm:px-2.5 ${styles.focus} ${isActive ? styles.active : styles.option}`}
                    >
                        {option.toUpperCase()}
                    </button>
                );
            })}
        </div>
    );
}
