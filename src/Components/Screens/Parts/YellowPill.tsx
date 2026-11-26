import Icon from 'src/Components/Icon/Icon';
import type { IconName } from 'src/Components/Icon/Icon';

interface IProps {
    label: string;
    icon?: IconName;
}

// PrimaryButton uit de app, als plaatje: in een placeholder is niets aanklikbaar.
export default function YellowPill(props: IProps) {
    const { label, icon = 'arrow-top-right' } = props;

    return (
        <div className='flex flex-1 items-center justify-between rounded-full bg-yellow px-[24px] py-[16px] text-indigo'>
            <span className='text-[16px] font-extrabold'>{label}</span>
            <Icon name={icon} size={22} />
        </div>
    );
}
