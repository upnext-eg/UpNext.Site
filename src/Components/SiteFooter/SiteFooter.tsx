import BrandMark from 'src/Components/BrandMark/BrandMark';
import LanguageToggle from 'src/Components/LanguageToggle/LanguageToggle';
import StoreAction from 'src/Components/StoreAction/StoreAction';
import { footer } from 'src/Content/site';
import { useDialogs } from 'src/Hooks/useDialogs';
import { useLanguage } from 'src/Hooks/useLanguage';
import { trackClick } from 'src/Logic/Api/siteApi';

const linkStyle =
    'inline-flex min-h-8 w-fit cursor-pointer items-center text-left text-[0.9375rem] font-semibold text-navy underline-offset-[3px] hover:underline focus-visible:outline-indigo focus-visible:outline-offset-2';
const columnTitle = 'mb-1 text-sm font-extrabold text-indigo';

// De footer uit UpNext.Onepager, onderaan in de roze boog van de call-to-action.
export default function SiteFooter() {
    const { t } = useLanguage();
    const { openPrivacy } = useDialogs();

    const { company } = footer;
    const hasContact = Boolean(company.name || company.email || company.kvk || company.privacyUrl);

    return (
        <footer className='mx-auto mt-[clamp(32px,4vw,56px)] max-w-[1280px] border-t border-indigo/15 text-left'>
            <div className='grid grid-cols-2 gap-6 py-6 sm:gap-8 sm:py-8 md:grid-cols-[2fr_repeat(3,1fr)]'>
                <div className='col-span-full flex flex-col gap-3 md:col-span-1'>
                    <BrandMark tone='dark' />
                    <p className='max-w-[28ch] text-[0.9375rem] text-navy'>{t(footer.tagline)}</p>
                </div>

                <nav aria-label={t(footer.pageTitle)} className='flex flex-col gap-2'>
                    <h3 className={columnTitle}>{t(footer.pageTitle)}</h3>
                    <a href='#top' className={linkStyle}>
                        {t(footer.howItWorks)}
                    </a>
                    <a href='#download' onClick={() => trackClick('download', 'footer')} className={linkStyle}>
                        {t(footer.download)}
                    </a>
                    <button type='button' aria-haspopup='dialog' onClick={openPrivacy} className={linkStyle}>
                        {t(footer.privacyLabel)}
                    </button>
                </nav>

                <nav aria-label={t(footer.appTitle)} className='flex flex-col gap-2'>
                    <h3 className={columnTitle}>{t(footer.appTitle)}</h3>
                    <StoreAction store='appStore' source='footer' className={linkStyle}>
                        App Store
                    </StoreAction>
                    <StoreAction store='googlePlay' source='footer' className={linkStyle}>
                        Google Play
                    </StoreAction>
                </nav>

                {hasContact && (
                    <div className='flex flex-col gap-2'>
                        <h3 className={columnTitle}>{t(footer.contactTitle)}</h3>
                        {company.name && <p className='text-[0.9375rem] text-navy'>{company.name}</p>}
                        {company.email && (
                            <a href={`mailto:${company.email}`} className={linkStyle}>
                                {company.email}
                            </a>
                        )}
                        {company.kvk && (
                            <p className='text-[0.9375rem] text-navy'>
                                {t(footer.kvkLabel)} {company.kvk}
                            </p>
                        )}
                        {company.privacyUrl && (
                            <a href={company.privacyUrl} className={linkStyle}>
                                {t(footer.privacyLabel)}
                            </a>
                        )}
                    </div>
                )}
            </div>

            <div className='flex flex-wrap items-center justify-between gap-4 border-t border-indigo/15 py-5'>
                <p className='text-sm font-bold text-indigo'>{footer.copyright}</p>
                <LanguageToggle tone='dark' />
            </div>
        </footer>
    );
}
