import { upNextMoment } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

// De pushmelding van het UP NEXT-moment, zoals in UpNext.Onepager. Op 390 px-formaat; PhoneCallout plaatst en schaalt hem.
export default function UpNextNotification() {
    const { t } = useLanguage();

    return (
        <div className='flex items-center gap-[12px] rounded-[26px] bg-blush py-[14px] pr-[16px] pl-[14px] text-indigo shadow-[0_18px_40px_-10px] shadow-midnight/60'>
            <img src='/logo.svg' alt='' className='size-[44px] shrink-0 rounded-[11px]' />
            <div className='flex grow flex-col gap-[2px] leading-[1.4]'>
                <div className='flex items-baseline justify-between'>
                    <span className='text-[16px] font-extrabold text-purple'>{t(upNextMoment.notificationTitle)}</span>
                    <span className='text-[13px] font-semibold text-indigo'>{t(upNextMoment.now)}</span>
                </div>
                <span className='text-[15px] font-semibold'>{t(upNextMoment.notificationBody)}</span>
            </div>
        </div>
    );
}
