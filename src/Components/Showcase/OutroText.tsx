import Icon from 'src/Components/Icon/Icon';
import StoreButton from 'src/Components/StoreButton/StoreButton';
import { callToAction, outro } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

interface IProps {
    className?: string;
}

// Het slot van de showcase, naar de banner in Designs/: links het app-icoon, UPNEXT, "Coming soon" en de stores; rechts de roze kaart met Q1 2027.
// Op een breed scherm staat de telefoon er in het midden tussen.
export default function OutroText(props: IProps) {
    const { className = '' } = props;

    const { t } = useLanguage();

    const { appStore, googlePlay } = callToAction;
    const stores = [
        { store: 'appStore', icon: 'apple', ...appStore },
        { store: 'googlePlay', icon: 'google-play', ...googlePlay },
    ] as const;

    return (
        <div data-outro className={className}>
            <div
                data-text-part
                className='flex flex-col items-center gap-3 wide:col-start-1 wide:row-start-1 wide:items-end wide:gap-5 wide:text-right'
            >
                <div className='flex items-center gap-3 wide:gap-5'>
                    <img
                        src='/logo.svg'
                        alt=''
                        width={112}
                        height={112}
                        className='shadow-card size-12 rounded-[22%] wide:size-[clamp(72px,7vw,112px)]'
                    />
                    <h2 className='font-display text-[2.75rem] leading-none tracking-[0.005em] text-white uppercase wide:text-[clamp(3.5rem,6.5vw,7rem)]'>
                        UpNext
                    </h2>
                </div>
                <p className='text-base text-lavender wide:text-[clamp(1.0625rem,1.5vw,1.5rem)]'>{t(outro.subtitle)}</p>
                <div className='flex flex-wrap justify-center gap-2 wide:justify-end wide:gap-3'>
                    {stores.map((item) => (
                        <StoreButton
                            key={item.store}
                            store={item.store}
                            source='outro'
                            overline={t(item.overline)}
                            name={item.name}
                            icon={item.icon}
                            tone='midnight'
                            isCompact
                        />
                    ))}
                </div>
            </div>
            <div data-text-part className='wide:col-start-3 wide:row-start-1 wide:justify-self-start'>
                {/* Verhoudingen nagemeten op de banner in Designs/: alle maten in em, zodat de kaart op elk formaat dezelfde vorm houdt. */}
                <div className='bg-hero-card shadow-card font-display relative flex items-end gap-[0.1em] overflow-hidden rounded-[0.26em_0.26em_0.61em_0.26em] py-[0.19em] pr-[0.42em] pl-[0.29em] text-[2.75rem] leading-none text-purple wide:text-[clamp(3rem,5.5vw,6rem)]'>
                    <span
                        aria-hidden='true'
                        className='absolute top-0 right-0 size-[0.79em] bg-yellow [clip-path:polygon(0_0,100%_0,100%_100%)]'
                    />
                    <span className='whitespace-nowrap uppercase'>{outro.launch}</span>
                    <Icon name='arrow-top-right' size={24} className='mb-[0.04em] size-[0.4em]' />
                </div>
            </div>
        </div>
    );
}
