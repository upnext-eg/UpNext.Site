import Icon from 'src/Components/Icon/Icon';
import { callToAction, outro, storeLinks } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

interface IProps {
    className?: string;
}

const pill =
    'inline-flex min-h-11 items-center rounded-full border-2 border-pink px-5 text-[0.9375rem] font-extrabold whitespace-nowrap text-white';

// Het slot van de showcase, naar de banner in Designs/: links het app-icoon, UPNEXT, "Coming soon" en de stores; rechts de roze kaart met Q1 2027.
// Op een breed scherm staat de telefoon er in het midden tussen.
export default function OutroText(props: IProps) {
    const { className = '' } = props;

    const { t } = useLanguage();

    const stores = [
        { name: callToAction.appStore.name, href: storeLinks.appStore },
        { name: callToAction.googlePlay.name, href: storeLinks.googlePlay },
    ];

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
                <div className='flex gap-3'>
                    {stores.map((store) =>
                        store.href ? (
                            <a
                                key={store.name}
                                href={store.href}
                                className={`${pill} transition-colors hover:bg-pink/14`}
                            >
                                {store.name}
                            </a>
                        ) : (
                            <span key={store.name} aria-disabled='true' className={pill}>
                                {store.name}
                            </span>
                        ),
                    )}
                </div>
            </div>
            <div data-text-part className='wide:col-start-3 wide:row-start-1 wide:justify-self-start'>
                <div className='rounded-card-shape bg-hero-card shadow-card relative flex items-end gap-2 overflow-hidden py-2 pr-8 pl-5 text-purple wide:gap-4 wide:py-5 wide:pr-16 wide:pl-9'>
                    <span
                        aria-hidden='true'
                        className='absolute top-0 right-0 size-10 bg-yellow [clip-path:polygon(0_0,100%_0,100%_100%)] wide:size-20'
                    />
                    <span className='font-display text-[2rem] leading-none whitespace-nowrap uppercase wide:text-[clamp(3rem,5.5vw,6rem)]'>
                        {outro.launch}
                    </span>
                    <Icon name='arrow-top-right' size={28} className='mb-1 wide:mb-2' />
                </div>
            </div>
        </div>
    );
}
