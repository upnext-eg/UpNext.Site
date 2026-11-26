import Icon from 'src/Components/Icon/Icon';
import { useLanguage } from 'src/Hooks/useLanguage';

import RoundButton from './Parts/RoundButton';

const text = {
    photo: { en: 'Photo', nl: 'Foto' },
    video: { en: 'Video', nl: 'Video' },
};

// De camera in de app: geen roze footer. Het beeld is een placeholder, lichtvlekken van een avond.
export default function CameraScreen() {
    const { t } = useLanguage();

    return (
        <div className='relative h-[844px] w-[390px] overflow-hidden bg-midnight text-[17px] leading-[1.55] font-semibold text-white'>
            <div className='bg-night-viewfinder absolute inset-0 blur-[6px]' />
            <div className='relative flex h-[54px] items-center px-[40px] pt-[6px] text-[16px] font-extrabold'>
                21:51
            </div>
            <div className='relative flex items-center justify-between px-[24px] py-[8px]'>
                <RoundButton icon='close' />
                <div className='flex items-center gap-[8px] rounded-full bg-yellow py-[8px] pr-[16px] pl-[12px] text-indigo'>
                    <Icon name='timer-outline' size={20} />
                    <span className='font-display text-[22px] leading-none'>2:46</span>
                </div>
            </div>
            <div className='absolute inset-x-0 bottom-[40px] flex flex-col items-center gap-[22px]'>
                <div data-reveal className='flex rounded-full bg-midnight/50 p-[4px]'>
                    <span className='rounded-full bg-white px-[22px] py-[8px] text-[14px] font-extrabold text-indigo'>
                        {t(text.photo)}
                    </span>
                    <span className='rounded-full px-[22px] py-[8px] text-[14px] font-extrabold'>{t(text.video)}</span>
                </div>
                <div data-reveal className='flex w-full items-center justify-between px-[44px]'>
                    <RoundButton icon='image-multiple-outline' />
                    <span className='flex size-[82px] items-center justify-center rounded-full border-[5px] border-white'>
                        <span className='size-[64px] rounded-full bg-white' />
                    </span>
                    <RoundButton icon='camera-flip-outline' />
                </div>
            </div>
        </div>
    );
}
