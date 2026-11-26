import { useLanguage } from 'src/Hooks/useLanguage';

import AppAvatar from './Parts/AppAvatar';
import HeroCard from './Parts/HeroCard';
import MediaTile from './Parts/MediaTile';
import PinkFooter from './Parts/PinkFooter';
import RowCard from './Parts/RowCard';
import ScreenCanvas from './Parts/ScreenCanvas';
import { screenText } from './Parts/screenText';
import SessionHeader from './Parts/SessionHeader';
import YellowPill from './Parts/YellowPill';

const text = {
    live: { en: 'Live · 4 players', nl: 'Live · 4 spelers' },
    cardLabel: { en: 'It’s your turn', nl: 'Jij bent aan de beurt' },
    openWithin: { en: 'Open your challenge within', nl: 'Open je opdracht binnen' },
    timeline: { en: 'Timeline', nl: 'Tijdlijn' },
    sam: { en: '10-second dance', nl: 'Dansje van 10 seconden' },
    open: { en: 'Open challenge', nl: 'Open opdracht' },
};

// Het sessiescherm op het moment dat jij aan de beurt bent. De pushmelding is een callout (callouts.ts) die eroverheen valt.
export default function YourTurnScreen() {
    const { t } = useLanguage();

    return (
        <ScreenCanvas
            time='21:47'
            footer={
                <PinkFooter>
                    <YellowPill label={t(text.open)} />
                </PinkFooter>
            }
        >
            <SessionHeader liveLabel={t(text.live)} title='Jullie clubje' />
            <div data-reveal>
                <HeroCard>
                    <span className={screenText.cardLabel}>{t(text.cardLabel)}</span>
                    <span className='font-display text-[56px] leading-none uppercase'>Up next!</span>
                    <div className='flex items-baseline gap-[8px] text-indigo'>
                        <span className='text-[14px] font-semibold'>{t(text.openWithin)}</span>
                        <span className='font-display text-[28px] leading-[1.1]'>4:32</span>
                    </div>
                    <div className='h-[8px] overflow-hidden rounded-[4px] bg-indigo/15'>
                        <div className='h-full w-[90%] rounded-[4px] bg-indigo' />
                    </div>
                </HeroCard>
            </div>
            <span className={screenText.heading}>{t(text.timeline)}</span>
            <div data-reveal>
                <RowCard>
                    <div className={screenText.row}>
                        <AppAvatar name='Sam' tone='pink' />
                        <div className={screenText.rowText}>
                            <span className={screenText.rowName}>Sam</span>
                            <span className={screenText.rowMeta}>{t(text.sam)}</span>
                        </div>
                        <span className={screenText.rowTime}>21:03</span>
                    </div>
                    <MediaTile kind='video' duration='0:10' />
                </RowCard>
            </div>
        </ScreenCanvas>
    );
}
