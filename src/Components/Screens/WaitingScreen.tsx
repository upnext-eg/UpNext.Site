import { useLanguage } from 'src/Hooks/useLanguage';

import AppAvatar from './Parts/AppAvatar';
import HeroCard from './Parts/HeroCard';
import PinkFooter from './Parts/PinkFooter';
import PlayersPill from './Parts/PlayersPill';
import RowCard from './Parts/RowCard';
import ScreenCanvas from './Parts/ScreenCanvas';
import { screenText } from './Parts/screenText';
import SessionHeader from './Parts/SessionHeader';

const text = {
    live: { en: 'Live · 4 players', nl: 'Live · 4 spelers' },
    cardLabel: { en: 'Breather', nl: 'Even rust' },
    cardTitle: { en: 'Next turn in ± 8 min', nl: 'Volgende beurt over ± 8 min' },
    cardBody: {
        en: 'Feel free to put your phone away: UpNext lets you know when it’s your turn.',
        nl: 'Leg je telefoon gerust weg: UpNext laat het weten als jij aan de beurt bent.',
    },
    timeline: { en: 'Timeline', nl: 'Tijdlijn' },
    sam: { en: '10-second dance', nl: 'Dansje van 10 seconden' },
    started: { en: 'Session started', nl: 'Sessie gestart' },
    players: { en: '4 players', nl: '4 spelers' },
};

export default function WaitingScreen() {
    const { t } = useLanguage();

    return (
        <ScreenCanvas
            time='21:12'
            footer={
                <PinkFooter>
                    <PlayersPill label={t(text.players)} />
                </PinkFooter>
            }
        >
            <SessionHeader liveLabel={t(text.live)} title='Jullie clubje' />
            <div data-reveal>
                <HeroCard>
                    <span className={screenText.cardLabel}>{t(text.cardLabel)}</span>
                    <span className={`${screenText.cardDisplay} pr-[48px]`}>{t(text.cardTitle)}</span>
                    <span className={screenText.cardBody}>{t(text.cardBody)}</span>
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
                </RowCard>
            </div>
            <div data-reveal>
                <RowCard>
                    <div className={screenText.row}>
                        <AppAvatar name='Noor' tone='yellow' />
                        <div className={screenText.rowText}>
                            <span className={screenText.rowName}>Noor</span>
                            <span className={screenText.rowMeta}>{t(text.started)}</span>
                        </div>
                        <span className={screenText.rowTime}>20:42</span>
                    </div>
                </RowCard>
            </div>
        </ScreenCanvas>
    );
}
