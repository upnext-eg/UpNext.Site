import Icon from 'src/Components/Icon/Icon';
import { useLanguage } from 'src/Hooks/useLanguage';

import CircleIcon from './Parts/CircleIcon';
import HeroCard from './Parts/HeroCard';
import PinkFooter from './Parts/PinkFooter';
import ScreenCanvas from './Parts/ScreenCanvas';
import { screenText } from './Parts/screenText';
import YellowPill from './Parts/YellowPill';

const text = {
    type: { en: 'Dare', nl: 'Durf' },
    title: { en: 'Group photo with a stranger', nl: 'Groepsfoto met een vreemde' },
    body: {
        en: 'Take a group photo with someone you didn’t know before tonight. Everyone from the group who’s around has to be in it.',
        nl: 'Maak een groepsfoto met iemand die je vanavond nog niet kende. Iedereen uit de groep die erbij is, moet erop staan.',
    },
    media: { en: 'Send as photo, video or text', nl: 'Insturen als foto, video of tekst' },
    writeText: { en: 'Write text', nl: 'Tekst schrijven' },
    skip: { en: 'Skip challenge', nl: 'Opdracht overslaan' },
    capture: { en: 'Take photo or video', nl: 'Foto of video maken' },
};

export default function ChallengeScreen() {
    const { t } = useLanguage();

    return (
        <ScreenCanvas
            time='21:49'
            footer={
                <PinkFooter>
                    <YellowPill label={t(text.capture)} icon='camera-outline' />
                </PinkFooter>
            }
        >
            <div className='flex items-center justify-between'>
                <CircleIcon icon='chevron-left' />
                <div className='flex items-center gap-[8px] rounded-full bg-yellow py-[8px] pr-[16px] pl-[12px] text-indigo'>
                    <Icon name='timer-outline' size={20} />
                    <span className='font-display text-[22px] leading-none'>4:58</span>
                </div>
            </div>
            <div data-reveal>
                <HeroCard>
                    <span className='self-start rounded-full border-[1.5px] border-indigo px-[10px] py-[4px] text-[11px] leading-[1.4] font-extrabold tracking-[0.5px] text-indigo uppercase'>
                        {t(text.type)}
                    </span>
                    <span className={`${screenText.cardDisplay} pr-[32px] text-[40px]!`}>{t(text.title)}</span>
                    <span className={`${screenText.cardBody} text-[15px]! leading-[1.5]!`}>{t(text.body)}</span>
                    <div className='flex items-center gap-[8px] border-t border-indigo/15 pt-[12px] text-[13px] font-bold text-purple'>
                        <Icon name='camera-outline' size={18} />
                        {t(text.media)}
                    </div>
                </HeroCard>
            </div>
            <div data-reveal className={screenText.outlinePill}>
                {t(text.writeText)}
            </div>
            <span className='self-center text-[14px] font-extrabold text-pink underline underline-offset-[3px]'>
                {t(text.skip)}
            </span>
        </ScreenCanvas>
    );
}
