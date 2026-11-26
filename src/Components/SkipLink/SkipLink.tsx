import { header } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

// Alleen zichtbaar met het toetsenbord: springt over de navigatie heen naar de inhoud.
export default function SkipLink() {
    const { t } = useLanguage();

    return (
        <a
            href='#main'
            className='fixed top-3 left-3 z-[60] -translate-y-[200%] rounded-full bg-yellow px-5 py-2.5 font-extrabold text-indigo focus-visible:translate-y-0'
        >
            {t(header.skipLink)}
        </a>
    );
}
