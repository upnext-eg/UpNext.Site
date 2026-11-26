import { placeholderScreens, screenHeight, screenWidth } from 'src/Components/Screens/screens';
import type { FlowStep } from 'src/Content/happyFlow';
import { useLanguage } from 'src/Hooks/useLanguage';

interface IProps {
    step: FlowStep;
}

// Eén scherm in de telefoon: de screenshot uit de config, of anders de placeholder. Voor een screenreader een beschreven afbeelding.
export default function PhoneScreen(props: IProps) {
    const { step } = props;

    const { t } = useLanguage();

    if (step.screenshot) {
        return (
            <img
                src={t(step.screenshot)}
                alt={t(step.alt)}
                width={screenWidth}
                height={screenHeight}
                decoding='async'
                className='absolute inset-0 size-full object-cover'
            />
        );
    }

    const Placeholder = placeholderScreens[step.screen];

    return (
        <div
            role='img'
            aria-label={t(step.alt)}
            className='absolute top-0 left-0 h-[844px] w-[390px] origin-top-left scale-(--screen-scale)'
        >
            <Placeholder />
        </div>
    );
}
