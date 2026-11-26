import type { FlowStep } from 'src/Content/happyFlow';
import { useLanguage } from 'src/Hooks/useLanguage';

interface IProps {
    step: FlowStep;
    index: number;
    // 'split' zet de titel links en de uitleg rechts van een telefoon in het midden (op een breed scherm).
    variant: 'side' | 'split';
    className?: string;
}

// Titel en uitleg in de typografie van UpNext.Onepager, zonder label erboven. Op de gele vloed van het UP NEXT-moment indigo en navy.
export default function StepText(props: IProps) {
    const { step, index, variant, className = '' } = props;

    const { t } = useLanguage();

    // De eerste stap is de opening van de pagina: de enige h1, groter gezet.
    const isOpening = index === 0;
    const Heading = isOpening ? 'h1' : 'h2';
    const isSplit = variant === 'split';
    const size = isOpening
        ? 'text-[clamp(3.25rem,15vw,5rem)] leading-[1.04] wide:text-[clamp(3.5rem,6.4vw,7rem)]'
        : 'text-[clamp(2rem,9vw,2.75rem)] leading-[1.16] wide:text-[clamp(2.5rem,5.2vw,4.75rem)]';

    return (
        <div data-step-text className={className}>
            <Heading
                data-text-part
                className={`font-display max-w-[14ch] tracking-[0.005em] text-balance uppercase ${step.isUpNextMoment ? 'text-indigo' : 'text-white'} ${size} ${isSplit ? 'wide:col-start-1 wide:row-start-1 wide:justify-self-end wide:text-right' : ''}`}
            >
                {t(step.title)}
                {step.titleAccent && (
                    <>
                        {' '}
                        <span className='text-yellow'>{t(step.titleAccent)}</span>
                    </>
                )}
            </Heading>
            <p
                data-text-part
                className={`max-w-[34ch] text-base leading-[1.55] text-pretty ${step.isUpNextMoment ? 'text-navy' : 'text-lavender'} wide:text-[clamp(1.0625rem,1.3vw,1.25rem)] ${isSplit ? 'wide:col-start-3 wide:row-start-1' : ''}`}
            >
                {t(step.description)}
            </p>
        </div>
    );
}
