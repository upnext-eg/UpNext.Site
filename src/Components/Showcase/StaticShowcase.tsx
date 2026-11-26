import PhoneMockup from 'src/Components/PhoneMockup/PhoneMockup';
import PhoneScreen from 'src/Components/PhoneMockup/PhoneScreen';
import type { FlowStep } from 'src/Content/happyFlow';
import { showcase } from 'src/Content/site';
import { useLanguage } from 'src/Hooks/useLanguage';

import StepText from './StepText';

interface IProps {
    steps: FlowStep[];
}

// Voor prefers-reduced-motion: dezelfde stappen onder elkaar, zonder pin of scroll-animatie.
export default function StaticShowcase(props: IProps) {
    const { steps } = props;

    const { t } = useLanguage();

    return (
        <section
            aria-label={t(showcase.label)}
            id='zo-werkt-het'
            className='mx-auto flex max-w-6xl flex-col gap-24 px-4 pt-28 pb-24 [--phone-h:min(70svh,600px)] [--phone-w:calc(var(--phone-h)*0.48)] md:px-10'
        >
            {steps.map((step, index) => (
                <div key={step.id} className='grid items-center gap-10 md:grid-cols-2 md:gap-16'>
                    <div className={`flex justify-center ${step.phone === 'right' ? 'md:order-2' : ''}`}>
                        <PhoneMockup>
                            <div className='absolute inset-0'>
                                <PhoneScreen step={step} />
                            </div>
                        </PhoneMockup>
                    </div>
                    <StepText
                        step={step}
                        index={index}
                        variant='side'
                        className='flex flex-col items-center gap-5 text-center md:items-start md:text-left'
                    />
                </div>
            ))}
        </section>
    );
}
