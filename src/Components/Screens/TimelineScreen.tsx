import { useLanguage } from 'src/Hooks/useLanguage';

import MediaTile from './Parts/MediaTile';
import PinkFooter from './Parts/PinkFooter';
import PlayersPill from './Parts/PlayersPill';
import PostRow from './Parts/PostRow';
import RowCard from './Parts/RowCard';
import ScreenCanvas from './Parts/ScreenCanvas';
import { screenText } from './Parts/screenText';
import SessionHeader from './Parts/SessionHeader';

const text = {
    live: { en: 'Live · 4 players · 1 watching', nl: 'Live · 4 spelers · 1 kijkt mee' },
    timeline: { en: 'Timeline', nl: 'Tijdlijn' },
    noor: { en: 'Group photo with a stranger', nl: 'Groepsfoto met een vreemde' },
    yara: { en: 'Share something nobody here knows', nl: 'Vertel iets wat niemand hier van je weet' },
    yaraAnswer: {
        en: 'I once spent a whole summer working as a theme park mascot.',
        nl: 'Ik heb ooit een hele zomer in een pretpark als mascotte gewerkt.',
    },
    mo: { en: 'Impersonate someone in the group', nl: 'Imiteer iemand uit de groep' },
    players: { en: '4 players · 1 watching', nl: '4 spelers · 1 kijkt mee' },
};

export default function TimelineScreen() {
    const { t } = useLanguage();

    return (
        <ScreenCanvas
            time='00:14'
            footer={
                <PinkFooter>
                    <PlayersPill label={t(text.players)} />
                </PinkFooter>
            }
        >
            <SessionHeader liveLabel={t(text.live)} title='Jullie clubje' />
            <span className={screenText.heading}>{t(text.timeline)}</span>
            <div data-reveal>
                <RowCard>
                    <PostRow name='Mo' tone='purple' challenge={t(text.mo)} time='23:41' />
                    <MediaTile kind='video' height={120} duration='0:24' />
                </RowCard>
            </div>
            <div data-reveal>
                <RowCard>
                    <PostRow name='Yara' tone='periwinkle' challenge={t(text.yara)} time='22:58' />
                    <div className='rounded-[8px_8px_20px_8px] bg-pink px-[14px] py-[12px] text-[15px] leading-[1.45] font-bold text-indigo'>
                        {t(text.yaraAnswer)}
                    </div>
                </RowCard>
            </div>
            <div data-reveal>
                <RowCard>
                    <PostRow name='Noor' tone='yellow' challenge={t(text.noor)} time='21:52' />
                    <MediaTile kind='photo' height={150} />
                </RowCard>
            </div>
        </ScreenCanvas>
    );
}
