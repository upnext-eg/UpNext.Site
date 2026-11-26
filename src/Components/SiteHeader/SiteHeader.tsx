import BrandMark from 'src/Components/BrandMark/BrandMark';
import LanguageToggle from 'src/Components/LanguageToggle/LanguageToggle';
import { header } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

// Vaste effen paarse balk, zoals in UpNext.Onepager: merk links, taal en Download rechts (ook op mobiel: daar installeert een bezoeker de app).
export default function SiteHeader() {
    const { t } = useLanguage();

    return (
        <header className='fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between gap-2 bg-purple px-[clamp(14px,3vw,40px)] shadow-[0_1px_0_color-mix(in_srgb,var(--color-lavender)_12%,transparent)] md:h-[72px]'>
            <a href='#top' aria-label={t(header.homeLabel)} className='rounded-row focus-visible:outline-offset-4'>
                <BrandMark />
            </a>
            <div className='flex items-center gap-2 sm:gap-3'>
                <LanguageToggle />
                <a
                    href='#download'
                    className='shadow-button inline-flex min-h-11 items-center rounded-full bg-yellow px-3.5 text-[0.9375rem] font-extrabold text-indigo transition-transform hover:-translate-y-0.5 sm:px-[18px]'
                >
                    {t(header.download)}
                </a>
            </div>
        </header>
    );
}
