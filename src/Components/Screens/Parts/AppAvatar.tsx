// Zelfde tinten als getAvatarTone in de app.
const tones = {
    yellow: 'bg-yellow text-indigo',
    pink: 'bg-pink text-indigo',
    periwinkle: 'bg-periwinkle text-navy',
    purple: 'bg-purple text-white',
} as const;

export type AvatarTone = keyof typeof tones;

interface IProps {
    name: string;
    tone: AvatarTone;
    size?: number;
    className?: string;
}

export default function AppAvatar(props: IProps) {
    const { name, tone, size = 32, className = '' } = props;

    return (
        <span
            aria-hidden='true'
            className={`flex shrink-0 items-center justify-center rounded-full font-extrabold ${tones[tone]} ${className}`}
            style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
        >
            {name.charAt(0)}
        </span>
    );
}
