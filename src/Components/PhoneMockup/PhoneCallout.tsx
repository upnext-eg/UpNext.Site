import { screenHeight, screenWidth } from 'src/Components/Screens/screens';

import { callouts } from './callouts';
import type { CalloutId } from './callouts';

interface IProps {
    id: CalloutId;
    stepId: string;
}

// Ligt precies over het scherm (zelfde inset als het glas) en begint op de plek van het origineel; de timeline tilt hem naar voren.
export default function PhoneCallout(props: IProps) {
    const { id, stepId } = props;

    const { Component, box } = callouts[id];

    return (
        <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-[calc(var(--phone-w)*0.035)] transform-3d'
        >
            <div
                className='absolute top-0 left-0 origin-top-left scale-(--screen-scale) transform-3d'
                style={{ width: screenWidth, height: screenHeight }}
            >
                <div data-callout={stepId} className='invisible absolute' style={box}>
                    <Component />
                </div>
            </div>
        </div>
    );
}
