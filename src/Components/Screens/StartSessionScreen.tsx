import Icon from 'src/Components/Icon/Icon';
import { useLanguage } from 'src/Hooks/useLanguage';

import AppAvatar from './Parts/AppAvatar';
import type { AvatarTone } from './Parts/AppAvatar';
import CircleIcon from './Parts/CircleIcon';
import PinkFooter from './Parts/PinkFooter';
import RowCard from './Parts/RowCard';
import ScreenCanvas from './Parts/ScreenCanvas';
import { screenText } from './Parts/screenText';
import YellowPill from './Parts/YellowPill';

// Teksten uit de app (sessions.json, start).
const text = {
    step: { en: 'Step 1 of 2', nl: 'Stap 1 van 2' },
    title: { en: 'Who’s in?', nl: 'Wie zijn erbij?' },
    body: {
        en: 'Everyone is selected by default. Remove anyone who isn’t there.',
        nl: 'Iedereen is standaard geselecteerd. Haal weg wie er niet bij is.',
    },
    participants: { en: 'Participants', nl: 'Deelnemers' },
    selectAll: { en: 'Select all', nl: 'Selecteer alle' },
    you: { en: 'You · game leader', nl: 'Jij · spelleider' },
    selected: {
        en: '2 of 4 selected. They’ll get an invite to join.',
        nl: '2 van 4 geselecteerd. Zij krijgen een uitnodiging om mee te doen.',
    },
    next: { en: 'Choose packs', nl: 'Kies pakketten' },
};

// Noor speelt vanavond alleen met haar bestie Sam.
const players: { name: string; tone: AvatarTone; isYou?: boolean; isSelected: boolean }[] = [
    { name: 'Noor', tone: 'yellow', isYou: true, isSelected: true },
    { name: 'Sam', tone: 'pink', isSelected: true },
    { name: 'Yara', tone: 'periwinkle', isSelected: false },
    { name: 'Mo', tone: 'purple', isSelected: false },
];

export default function StartSessionScreen() {
    const { t } = useLanguage();

    return (
        <ScreenCanvas
            time='20:41'
            footer={
                <PinkFooter>
                    <YellowPill label={t(text.next)} />
                </PinkFooter>
            }
        >
            <CircleIcon icon='chevron-left' />
            <div className='flex flex-col gap-[4px]'>
                <span className={screenText.brand}>{t(text.step)}</span>
                <span className={`${screenText.display} text-[44px]!`}>{t(text.title)}</span>
            </div>
            <span className={screenText.body}>{t(text.body)}</span>
            <div className='flex items-baseline justify-between pt-[2px]'>
                <span className={screenText.heading}>{t(text.participants)}</span>
                <span className='text-[14px] font-extrabold text-pink underline underline-offset-[3px]'>
                    {t(text.selectAll)}
                </span>
            </div>
            {players.map((player) => (
                <div key={player.name} data-reveal>
                    <RowCard>
                        <div className={`${screenText.row} px-[4px]`}>
                            <AppAvatar name={player.name} tone={player.tone} size={40} />
                            <div className={screenText.rowText}>
                                <span className={screenText.rowName}>{player.name}</span>
                                {player.isYou && <span className={screenText.rowMeta}>{t(text.you)}</span>}
                            </div>
                            {/* ParticipantToggleRow in de app: roze ring, geselecteerd geel met vinkje; de spelleider doet altijd mee. */}
                            <span
                                className={`flex size-[28px] shrink-0 items-center justify-center rounded-full border-2 text-indigo ${player.isSelected ? 'border-yellow bg-yellow' : 'border-pink'} ${player.isYou ? 'opacity-55' : ''}`}
                            >
                                {player.isSelected && <Icon name='check' size={18} />}
                            </span>
                        </div>
                    </RowCard>
                </div>
            ))}
            <span className='text-center text-[13px] leading-[1.45] font-semibold text-lavender'>
                {t(text.selected)}
            </span>
        </ScreenCanvas>
    );
}
