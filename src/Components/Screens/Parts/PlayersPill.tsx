import Icon from 'src/Components/Icon/Icon';

import AppAvatar from './AppAvatar';
import type { AvatarTone } from './AppAvatar';

const players: { name: string; tone: AvatarTone }[] = [
    { name: 'Noor', tone: 'yellow' },
    { name: 'Sam', tone: 'purple' },
    { name: 'Yara', tone: 'periwinkle' },
    { name: 'Mo', tone: 'purple' },
];

interface IProps {
    label: string;
}

// De deelnemersknop in de footer van een sessie.
export default function PlayersPill(props: IProps) {
    const { label } = props;

    return (
        <div className='flex flex-1 items-center gap-[10px] rounded-full border-2 border-indigo py-[8px] pr-[14px] pl-[8px] text-indigo'>
            <span className='flex'>
                {players.map((player, index) => (
                    <AppAvatar
                        key={player.name}
                        name={player.name}
                        tone={player.tone}
                        className={`shadow-[0_0_0_2px_var(--color-pink)] ${index > 0 ? '-ml-[8px]' : ''}`}
                    />
                ))}
            </span>
            <span className='grow text-[14px] font-extrabold'>{label}</span>
            <Icon name='chevron-right' size={22} />
        </div>
    );
}
