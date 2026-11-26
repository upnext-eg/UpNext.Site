import { useLanguage } from 'src/Hooks/useLanguage';

import CircleIcon from './Parts/CircleIcon';
import HeroCard from './Parts/HeroCard';
import PinkFooter from './Parts/PinkFooter';
import RowCard from './Parts/RowCard';
import ScreenCanvas from './Parts/ScreenCanvas';
import { screenText } from './Parts/screenText';
import YellowPill from './Parts/YellowPill';

const text = {
    greeting: { en: 'Hi Noor', nl: 'Hoi Noor' },
    cardLabel: { en: 'No group yet', nl: 'Nog geen groep' },
    cardTitle: { en: 'Start your night', nl: 'Begin je avond' },
    cardBody: {
        en: 'Make a group for your friends, or join one with a code.',
        nl: 'Maak een groep voor je vrienden, of join er een met een code.',
    },
    join: { en: 'Join with code', nl: 'Join met code' },
    recent: { en: 'Recently played', nl: 'Recent gespeeld' },
    empty: { en: 'Your nights will show up here.', nl: 'Hier komen jullie avonden.' },
    createGroup: { en: 'Create group', nl: 'Groep maken' },
};

export default function HomeScreen() {
    const { t } = useLanguage();

    return (
        <ScreenCanvas
            time='20:30'
            footer={
                <PinkFooter>
                    <YellowPill label={t(text.createGroup)} />
                </PinkFooter>
            }
        >
            <div className='flex items-center justify-between'>
                <span className={screenText.brand}>UpNext</span>
                <CircleIcon icon='bell-outline' />
            </div>
            <span data-reveal className={screenText.display}>
                {t(text.greeting)}
            </span>
            <div data-reveal>
                <HeroCard>
                    <span className={screenText.cardLabel}>{t(text.cardLabel)}</span>
                    <span className={screenText.cardDisplay}>{t(text.cardTitle)}</span>
                    <span className={screenText.cardBody}>{t(text.cardBody)}</span>
                </HeroCard>
            </div>
            <div data-reveal className={screenText.outlinePill}>
                {t(text.join)}
            </div>
            <span className={screenText.heading}>{t(text.recent)}</span>
            <RowCard>
                <span className={`${screenText.rowMeta} px-[16px] py-[18px]`}>{t(text.empty)}</span>
            </RowCard>
        </ScreenCanvas>
    );
}
