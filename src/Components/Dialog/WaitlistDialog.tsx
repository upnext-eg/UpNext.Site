import { useId, useState } from 'react';
import type { FormEvent } from 'react';

import type { ClickSource } from 'shared/siteApi';
import Icon from 'src/Components/Icon/Icon';
import { dialogs, waitlist } from 'src/Content/dialogs';
import { useLanguage } from 'src/Hooks/useLanguage';
import { joinWaitlist } from 'src/Logic/Api/siteApi';
import type { WaitlistResult } from 'src/Logic/Api/siteApi';

import Dialog from './Dialog';

type Status = 'idle' | 'submitting' | 'done';

interface IProps {
    // null: dicht. Anders de plek op de pagina waar de knop stond; die gaat mee naar de opslag.
    source: ClickSource | null;
    onClose: () => void;
    onOpenPrivacy: () => void;
}

// De popup achter de store-knoppen, in de stijl van de formulieren in de app: roze pill-veld, gele hoofdknop.
export default function WaitlistDialog(props: IProps) {
    const { source, onClose, onOpenPrivacy } = props;

    const { language, t } = useLanguage();
    const titleId = useId();
    const errorId = useId();

    const [email, setEmail] = useState('');
    const [website, setWebsite] = useState('');
    const [status, setStatus] = useState<Status>('idle');
    const [error, setError] = useState<Exclude<WaitlistResult, 'ok'> | null>(null);

    // Bij het sluiten (knop, Esc of klik ernaast) het formulier terugzetten: de volgende keer begint het opnieuw.
    function handleClose() {
        setStatus('idle');
        setError(null);
        onClose();
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!source || status === 'submitting') {
            return;
        }

        setStatus('submitting');
        setError(null);
        const result = await joinWaitlist({ email, language, source, website });
        if (result === 'ok') {
            setStatus('done');
            setEmail('');
        } else {
            setStatus('idle');
            setError(result);
        }
    }

    return (
        <Dialog isOpen={source !== null} onClose={handleClose} labelledBy={titleId}>
            <img
                src='/logo.svg'
                alt=''
                width={64}
                height={64}
                className='shadow-card size-16 -rotate-6 rounded-[22%]'
            />
            {status === 'done' ? (
                <>
                    <div className='flex flex-col gap-3'>
                        <h2 id={titleId} className='font-display text-[2.5rem] leading-[1.04] text-balance uppercase'>
                            {t(waitlist.doneTitle)}
                        </h2>
                        <p className='leading-relaxed text-lavender'>{t(waitlist.doneBody)}</p>
                    </div>
                    <button
                        type='button'
                        onClick={handleClose}
                        className='min-h-[54px] cursor-pointer rounded-full border-2 border-pink px-6 font-extrabold text-pink transition-colors hover:bg-pink/14'
                    >
                        {t(dialogs.close)}
                    </button>
                </>
            ) : (
                <>
                    <div className='flex flex-col gap-3 pr-10'>
                        <span className='font-display text-xl tracking-[3px] text-yellow uppercase'>UpNext</span>
                        <h2 id={titleId} className='font-display text-[2.5rem] leading-[1.04] text-balance uppercase'>
                            {t(waitlist.title)}
                        </h2>
                    </div>
                    <p className='leading-relaxed text-pretty text-lavender'>{t(waitlist.body)}</p>
                    <form onSubmit={handleSubmit} noValidate className='flex flex-col gap-3'>
                        <label htmlFor={`${titleId}-email`} className='sr-only'>
                            {t(waitlist.emailLabel)}
                        </label>
                        <input
                            id={`${titleId}-email`}
                            type='email'
                            name='email'
                            autoComplete='email'
                            inputMode='email'
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={t(waitlist.emailPlaceholder)}
                            aria-invalid={error === 'invalidEmail'}
                            aria-describedby={error ? errorId : undefined}
                            className='min-h-[54px] rounded-full bg-pink px-5 font-semibold text-indigo placeholder:text-amethyst focus-visible:outline-yellow'
                        />
                        {/* Honeypot: onzichtbaar en buiten de tabvolgorde; een mens vult dit nooit in. */}
                        <input
                            type='text'
                            name='website'
                            tabIndex={-1}
                            autoComplete='off'
                            aria-hidden='true'
                            value={website}
                            onChange={(event) => setWebsite(event.target.value)}
                            className='pointer-events-none absolute size-px overflow-hidden opacity-0'
                        />
                        {error && (
                            <p id={errorId} role='alert' className='text-sm font-bold text-pink'>
                                {t(waitlist.errors[error])}
                            </p>
                        )}
                        <button
                            type='submit'
                            disabled={status === 'submitting'}
                            className='shadow-button flex min-h-[54px] cursor-pointer items-center justify-between gap-4 rounded-full bg-yellow px-6 font-extrabold text-indigo transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70'
                        >
                            {t(waitlist.submit)}
                            <Icon name='arrow-top-right' size={20} />
                        </button>
                    </form>
                    <p className='text-[0.8125rem] leading-normal text-lavender'>
                        {t(waitlist.finePrint)}{' '}
                        <button
                            type='button'
                            onClick={onOpenPrivacy}
                            className='cursor-pointer font-extrabold text-pink underline underline-offset-[3px]'
                        >
                            {t(waitlist.privacyLink)}
                        </button>
                    </p>
                </>
            )}
        </Dialog>
    );
}
