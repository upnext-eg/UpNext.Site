import { useId } from 'react';

import { privacy, privacyContact } from 'src/Content/privacy';
import { useLanguage } from 'src/Hooks/useLanguage';

import Dialog from './Dialog';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

// De privacyverklaring als popup: de site blijft één pagina.
export default function PrivacyDialog(props: IProps) {
    const { isOpen, onClose } = props;

    const { t } = useLanguage();
    const titleId = useId();

    return (
        <Dialog isOpen={isOpen} onClose={onClose} labelledBy={titleId}>
            <div className='flex flex-col gap-2 pr-10'>
                <h2 id={titleId} className='font-display text-[2.25rem] leading-[1.04] uppercase'>
                    {t(privacy.title)}
                </h2>
                <p className='text-sm text-lavender'>{t(privacy.updated)}</p>
            </div>
            {privacy.sections.map((section) => (
                <section key={section.title.en} className='flex flex-col gap-2'>
                    <h3 className='font-display text-xl tracking-[0.5px] text-yellow uppercase'>{t(section.title)}</h3>
                    {section.body.map((paragraph) => (
                        <p key={paragraph.en} className='text-[0.9375rem] leading-relaxed text-lavender'>
                            {t(paragraph)}
                        </p>
                    ))}
                </section>
            ))}
            {privacyContact.email && (
                <p className='text-[0.9375rem] leading-relaxed text-lavender'>
                    {t(privacy.contactLine)}{' '}
                    <a
                        href={`mailto:${privacyContact.email}`}
                        className='font-extrabold text-pink underline underline-offset-[3px]'
                    >
                        {privacyContact.email}
                    </a>
                    .
                </p>
            )}
        </Dialog>
    );
}
