import Icon from 'src/Components/Icon/Icon';
import type { IconName } from 'src/Components/Icon/Icon';

interface IProps {
    icon: IconName;
}

// Een ronde knop op het camerabeeld.
export default function RoundButton(props: IProps) {
    const { icon } = props;

    return (
        <span className='flex size-[44px] items-center justify-center rounded-full border-2 border-white bg-midnight/30'>
            <Icon name={icon} size={22} />
        </span>
    );
}
