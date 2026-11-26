import Icon from 'src/Components/Icon/Icon';
import type { IconName } from 'src/Components/Icon/Icon';

interface IProps {
    icon: IconName;
}

// IconButton uit de app, als plaatje.
export default function CircleIcon(props: IProps) {
    const { icon } = props;

    return (
        <div className='flex size-[44px] shrink-0 items-center justify-center rounded-full border-2 border-pink text-pink'>
            <Icon name={icon} size={22} />
        </div>
    );
}
