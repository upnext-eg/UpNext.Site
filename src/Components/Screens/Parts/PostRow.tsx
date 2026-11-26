import AppAvatar from './AppAvatar';
import type { AvatarTone } from './AppAvatar';
import { screenText } from './screenText';

interface IProps {
    name: string;
    tone: AvatarTone;
    challenge: string;
    time: string;
}

// Wie, welke opdracht en hoe laat: de kop van een inzending in de tijdlijn.
export default function PostRow(props: IProps) {
    const { name, tone, challenge, time } = props;

    return (
        <div className={screenText.row}>
            <AppAvatar name={name} tone={tone} />
            <div className={screenText.rowText}>
                <span className={screenText.rowName}>{name}</span>
                <span className={screenText.rowMeta}>{challenge}</span>
            </div>
            <span className={screenText.rowTime}>{time}</span>
        </div>
    );
}
