import type { FlowStep } from 'src/Content/happyFlow';
import { usePrefersReducedMotion } from 'src/Hooks/usePrefersReducedMotion';

import ScrollShowcase from './ScrollShowcase';
import StaticShowcase from './StaticShowcase';

interface IProps {
    steps: FlowStep[];
}

export default function Showcase(props: IProps) {
    const { steps } = props;

    const prefersReducedMotion = usePrefersReducedMotion();

    return prefersReducedMotion ? <StaticShowcase steps={steps} /> : <ScrollShowcase steps={steps} />;
}
