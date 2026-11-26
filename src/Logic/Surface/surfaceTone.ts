// Ligt een punt op het scherm op een licht vlak (geel, roze) of op het paars? De eigen scrollbalk en de scroll-hint kiezen er hun kleur op:
// geel op paars, paars op geel en roze.
export type SurfaceTone = 'light' | 'dark';

// Een licht vlak krijgt data-surface='light' (een gewoon blok, zoals de roze footer) of data-surface-circle='light' (de gele cirkel van het UP NEXT-moment).
// De cirkel heeft pointer-events: none, dus elementsFromPoint ziet hem niet: die rekenen we zelf uit, binnen het vak dat hem afknipt.
export function surfaceToneAt(x: number, y: number): SurfaceTone {
    for (const circle of document.querySelectorAll<HTMLElement>('[data-surface-circle]')) {
        const box = circle.getBoundingClientRect();
        const clip = circle.parentElement?.getBoundingClientRect() ?? box;
        const radius = box.width / 2;
        const isInsideClip = x >= clip.left && x <= clip.right && y >= clip.top && y <= clip.bottom;
        const isInsideCircle = Math.hypot(x - (box.left + radius), y - (box.top + box.height / 2)) <= radius;
        if (radius > 0 && isInsideClip && isInsideCircle) {
            return circle.dataset.surfaceCircle as SurfaceTone;
        }
    }

    // Het bovenste element op dat punt dat niet bij de scrollbalk of de hint hoort; elementsFromPoint houdt rekening met ronde hoeken (de boog van de footer).
    const hit = document
        .elementsFromPoint(x, y)
        .find((element) => !element.closest('[data-surface-ignore]'))
        ?.closest<HTMLElement>('[data-surface]');

    return (hit?.dataset.surface as SurfaceTone | undefined) ?? 'dark';
}
