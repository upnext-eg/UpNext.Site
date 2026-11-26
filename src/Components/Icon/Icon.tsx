import {
    mdiAccountGroup,
    mdiApple,
    mdiArrowTopRight,
    mdiBattery,
    mdiBellOutline,
    mdiCameraFlipOutline,
    mdiCameraOutline,
    mdiCheck,
    mdiChevronLeft,
    mdiChevronRight,
    mdiClose,
    mdiContentCopy,
    mdiDotsHorizontal,
    mdiExportVariant,
    mdiGooglePlay,
    mdiImageMultipleOutline,
    mdiPlay,
    mdiSignalCellular3,
    mdiTimerOutline,
    mdiWifi,
} from '@mdi/js';

// Material Design Icons: dezelfde set als de app (react-native-paper). De namen zijn die uit MDI.
const paths = {
    'account-group': mdiAccountGroup,
    apple: mdiApple,
    'arrow-top-right': mdiArrowTopRight,
    battery: mdiBattery,
    'bell-outline': mdiBellOutline,
    'camera-flip-outline': mdiCameraFlipOutline,
    'camera-outline': mdiCameraOutline,
    check: mdiCheck,
    'chevron-left': mdiChevronLeft,
    'chevron-right': mdiChevronRight,
    close: mdiClose,
    'content-copy': mdiContentCopy,
    'dots-horizontal': mdiDotsHorizontal,
    'export-variant': mdiExportVariant,
    'google-play': mdiGooglePlay,
    'image-multiple-outline': mdiImageMultipleOutline,
    play: mdiPlay,
    'signal-cellular-3': mdiSignalCellular3,
    'timer-outline': mdiTimerOutline,
    wifi: mdiWifi,
} as const;

export type IconName = keyof typeof paths;

interface IProps {
    name: IconName;
    size: number;
    className?: string;
}

export default function Icon(props: IProps) {
    const { name, size, className } = props;

    return (
        <svg
            viewBox='0 0 24 24'
            width={size}
            height={size}
            fill='currentColor'
            className={`shrink-0 ${className ?? ''}`}
            aria-hidden='true'
        >
            <path d={paths[name]} />
        </svg>
    );
}
