import CircleIcon from './CircleIcon';

interface IProps {
    liveLabel: string;
    title: string;
}

// De kop van het sessiescherm: terug, deelnemers, menu, en "Live · 4 spelers" boven de groepsnaam.
export default function SessionHeader(props: IProps) {
    const { liveLabel, title } = props;

    return (
        <>
            <div className='flex items-center justify-between'>
                <CircleIcon icon='chevron-left' />
                <div className='flex gap-[10px]'>
                    <CircleIcon icon='account-group' />
                    <CircleIcon icon='dots-horizontal' />
                </div>
            </div>
            <div>
                <div className='flex items-center gap-[8px] text-[12px] font-extrabold tracking-[1px] text-pink uppercase'>
                    <span className='size-[10px] rounded-full bg-red shadow-[0_0_0_4px] shadow-red/30' />
                    {liveLabel}
                </div>
                <span className='font-display block text-[40px] leading-[1.05] uppercase'>{title}</span>
            </div>
        </>
    );
}
