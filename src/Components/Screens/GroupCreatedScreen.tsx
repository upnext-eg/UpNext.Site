import Icon from 'src/Components/Icon/Icon';
import { useLanguage } from 'src/Hooks/useLanguage';

import AppAvatar from './Parts/AppAvatar';
import type { AvatarTone } from './Parts/AppAvatar';
import CircleIcon from './Parts/CircleIcon';
import { groupName } from './Parts/groupName';
import PinkFooter from './Parts/PinkFooter';
import RowCard from './Parts/RowCard';
import ScreenCanvas from './Parts/ScreenCanvas';
import { screenText } from './Parts/screenText';
import YellowPill from './Parts/YellowPill';

const text = {
    created: { en: 'Group created', nl: 'Groep aangemaakt' },
    body: {
        en: 'Share the code with your friends. Whoever joins shows up below.',
        nl: 'Deel de code met je vrienden. Wie joint, verschijnt hieronder.',
    },
    code: { en: 'Group code', nl: 'Groepscode' },
    share: { en: 'Share code', nl: 'Code delen' },
    members: { en: 'Members', nl: 'Leden' },
    you: { en: 'You', nl: 'Jij' },
    owner: { en: 'Owner', nl: 'Eigenaar' },
    joined: { en: 'Just joined', nl: 'Net gejoind' },
    done: { en: 'Done', nl: 'Klaar' },
};

const members: { name: string; tone: AvatarTone }[] = [
    { name: 'Sam', tone: 'pink' },
    { name: 'Yara', tone: 'periwinkle' },
];

export default function GroupCreatedScreen() {
    const { t } = useLanguage();

    return (
        <ScreenCanvas
            time='20:34'
            footer={
                <PinkFooter>
                    <YellowPill label={t(text.done)} />
                </PinkFooter>
            }
        >
            <span className={screenText.brand}>{t(text.created)}</span>
            <span className={`${screenText.display} -mt-[12px]`}>{t(groupName)}</span>
            <span className={screenText.body}>{t(text.body)}</span>
            <div data-reveal>
                <RowCard>
                    <div className='flex items-center gap-[12px] p-[4px]'>
                        <div className={screenText.rowText}>
                            <span className={screenText.rowTime}>{t(text.code)}</span>
                            <span className='font-display text-[40px] leading-[1.1] tracking-[3px]'>XK7-4PQ</span>
                        </div>
                        <CircleIcon icon='content-copy' />
                    </div>
                    <div className={`${screenText.outlinePill} flex items-center justify-center gap-[8px]`}>
                        <Icon name='export-variant' size={18} />
                        {t(text.share)}
                    </div>
                </RowCard>
            </div>
            <span className={screenText.heading}>{t(text.members)}</span>
            <div data-reveal>
                <RowCard>
                    <div className={screenText.row}>
                        <AppAvatar name='Noor' tone='yellow' size={40} />
                        <div className={screenText.rowText}>
                            <span className={screenText.rowName}>Noor</span>
                            <span className={screenText.rowMeta}>{t(text.you)}</span>
                        </div>
                        <span className={screenText.tag}>{t(text.owner)}</span>
                    </div>
                </RowCard>
            </div>
            {members.map((member) => (
                <div key={member.name} data-reveal>
                    <RowCard>
                        <div className={screenText.row}>
                            <AppAvatar name={member.name} tone={member.tone} size={40} />
                            <div className={screenText.rowText}>
                                <span className={screenText.rowName}>{member.name}</span>
                                <span className={screenText.rowMeta}>{t(text.joined)}</span>
                            </div>
                        </div>
                    </RowCard>
                </div>
            ))}
        </ScreenCanvas>
    );
}
