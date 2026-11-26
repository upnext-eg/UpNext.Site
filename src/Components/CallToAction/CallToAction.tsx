import SiteFooter from 'src/Components/SiteFooter/SiteFooter';
import StoreButton from 'src/Components/StoreButton/StoreButton';
import { callToAction, storeLinks } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

// De slotsectie uit UpNext.Onepager: app-icoon, kop en uitleg op paars, daaronder de gebogen roze footer van de app op paginaformaat met de store-knoppen en de footer.
export default function CallToAction() {
    const { t } = useLanguage();

    const { appStore, googlePlay } = callToAction;

    return (
        <section
            id='download'
            aria-labelledby='download-title'
            className='relative pt-[clamp(96px,14vw,200px)] text-center'
        >
            <div className='flex flex-col items-center gap-4 px-5 pb-[clamp(32px,4vw,48px)]'>
                <img
                    src='/logo.svg'
                    alt=''
                    width={96}
                    height={96}
                    className='shadow-card aspect-square w-[clamp(72px,7vw,96px)] -rotate-6 rounded-[22%]'
                />
                <h2
                    id='download-title'
                    className='font-display max-w-[12ch] text-[clamp(3rem,7vw,6.5rem)] leading-[0.95] tracking-[0.005em] text-balance uppercase'
                >
                    {t(callToAction.title)}
                </h2>
                <p className='max-w-[32ch] text-[clamp(1.0625rem,1.3vw,1.25rem)] leading-[1.55] text-balance text-lavender'>
                    {t(callToAction.body)}
                </p>
            </div>
            <div className='bg-pink-footer shadow-footer rounded-t-[50%_clamp(28px,6vw,96px)] px-5 pt-[clamp(40px,4.5vw,64px)] text-indigo'>
                <div className='flex flex-wrap justify-center gap-4 max-sm:mx-auto max-sm:max-w-[340px] max-sm:flex-col'>
                    <StoreButton
                        href={storeLinks.appStore}
                        overline={t(storeLinks.appStore ? appStore.overline : appStore.comingSoon)}
                        name={appStore.name}
                        icon='apple'
                    />
                    <StoreButton
                        href={storeLinks.googlePlay}
                        overline={t(storeLinks.googlePlay ? googlePlay.overline : googlePlay.comingSoon)}
                        name={googlePlay.name}
                        icon='google-play'
                    />
                </div>
                <SiteFooter />
            </div>
        </section>
    );
}
