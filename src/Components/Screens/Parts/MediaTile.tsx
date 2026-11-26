import Icon from 'src/Components/Icon/Icon';

interface IProps {
    kind: 'photo' | 'video';
    height?: number;
    duration?: string;
}

// Een foto of video in de tijdlijn. De foto is een placeholder: lichtvlekken van een avond, geen echt beeld.
export default function MediaTile(props: IProps) {
    const { kind, height = 150, duration } = props;

    return (
        <div
            className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-[8px_8px_20px_8px] ${kind === 'video' ? 'bg-[linear-gradient(135deg,var(--color-violet)_0%,var(--color-periwinkle)_100%)]' : 'bg-night-photo'}`}
            style={{ height }}
        >
            {kind === 'video' && (
                <>
                    <span className='flex size-[52px] items-center justify-center rounded-full bg-midnight/45 text-white'>
                        <Icon name='play' size={30} />
                    </span>
                    {duration && (
                        <span className='absolute right-[10px] bottom-[10px] rounded-full bg-midnight/60 px-[8px] py-[3px] text-[12px] leading-[1.4] font-extrabold text-white'>
                            {duration}
                        </span>
                    )}
                </>
            )}
        </div>
    );
}
