// Tekststijlen van de app-schermen, overgenomen uit UpNext.Onepager (Screens/Parts/useScreenText.ts), op het 390 px-formaat.
// Zonder eigen regelhoogte geldt die van ScreenCanvas (1.55).
export const screenText = {
    brand: 'font-display text-[20px] tracking-[3px] text-yellow uppercase',
    display: 'font-display text-[48px] leading-[1.05] uppercase',
    heading: 'font-display text-[22px] tracking-[0.5px] uppercase',
    cardLabel: 'text-[12px] font-extrabold tracking-[1px] uppercase',
    cardDisplay: 'font-display text-[34px] leading-[1.05] text-purple uppercase',
    cardBody: 'text-[14px] leading-[1.45] font-semibold text-indigo',
    body: 'text-[15px] leading-[1.45] font-semibold text-lavender',
    row: 'flex items-center gap-[10px]',
    rowText: 'flex min-w-0 grow flex-col gap-px',
    rowName: 'text-[15px] font-extrabold',
    rowMeta: 'text-[13px] font-semibold text-lavender',
    rowTime: 'text-[12px] font-bold text-lavender',
    tag: 'shrink-0 rounded-full border-[1.5px] border-yellow px-[10px] py-[4px] text-[11px] font-extrabold tracking-[0.5px] text-yellow uppercase',
    outlinePill: 'rounded-full border-2 border-pink py-[12px] text-center text-[15px] font-extrabold text-pink',
} as const;
