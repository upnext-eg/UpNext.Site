import type { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

export default function RowCard(props: IProps) {
    const { children } = props;

    return (
        <div className='rounded-row-shape flex shrink-0 flex-col gap-[10px] border border-white/10 bg-indigo p-[12px]'>
            {children}
        </div>
    );
}
