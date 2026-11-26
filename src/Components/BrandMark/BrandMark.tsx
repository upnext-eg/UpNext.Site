interface IProps {
    // light: geel woordmerk op paars; dark: indigo op roze.
    tone?: 'light' | 'dark';
}

// App-icoon plus het woordmerk, zoals textStyles.brand in de app.
export default function BrandMark(props: IProps) {
    const { tone = 'light' } = props;

    return (
        <span className='inline-flex items-center gap-2.5'>
            <img src='/logo.svg' alt='' width={36} height={36} className='size-9 rounded-[9px]' />
            <span
                className={`font-display text-[1.375rem] leading-none tracking-[3px] uppercase ${tone === 'light' ? 'text-yellow' : 'text-indigo'}`}
            >
                UpNext
            </span>
        </span>
    );
}
