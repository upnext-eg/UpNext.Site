import type { FlowStep, PhonePosition } from 'src/Content/happyFlow';

// Gelijk aan de variant `wide` in index.css: daaronder staat de telefoon boven en de tekst eronder.
export const wideQuery = '(min-width: 64rem), (min-width: 48rem) and (orientation: landscape)';

// Hoe ver de telefoon opzij gaat op een breed scherm: een deel van de breedte, met een maximum. De tekstkolommen in CSS rekenen met dezelfde waarden.
export const offsetRatio = 0.22;
export const offsetMax = 360;

// De telefoon staat in de layout zo veel groter en wordt in de transform weer verkleind. Bij een 3D-transform met perspectief tekent Chrome een laag op zijn layoutformaat en negeert hij de schaal: ingezoomd zou de schermtekst dan een opgerekt plaatje zijn. Zo wordt hij alleen verkleind. Minstens de grootste zoom uit happyFlow.ts.
export const renderScale = 1.5;

export interface Pose {
    x: number;
    y: number;
    scale: number;
    rotationX: number;
    rotationY: number;
    rotationZ: number;
}

export interface Measure {
    isWide: boolean;
    stageWidth: number;
    phoneWidth: number;
    phoneHeight: number;
    // Het vak waarin de telefoon staat (breed: de hele stage; smal: het vak boven de tekst). De telefoon staat er verticaal in het midden.
    regionHeight: number;
    // Ruimte boven de telefoon die vrij moet blijven: op een breed scherm ligt de vaste header over de stage.
    topInset: number;
}

const bottomInset = 16;

// Valt de telefoon onderaan weg, dan duidelijk: minstens dit deel. Net een randje eraf ziet eruit als een fout.
const minimumCrop = 0.15;

type Tilt = Pick<Pose, 'rotationX' | 'rotationY' | 'rotationZ'>;

// Het scherm draait naar de tekst toe; in het midden leunt hij wat achterover.
const wideTilts: Record<PhonePosition, Tilt> = {
    left: { rotationX: 6, rotationY: 24, rotationZ: -5 },
    right: { rotationX: 6, rotationY: -24, rotationZ: 5 },
    center: { rotationX: 10, rotationY: -14, rotationZ: 3 },
};

// Op een smal scherm staat de telefoon altijd in het midden: om en om een kant op, zodat hij toch beweegt.
const narrowTilts: Tilt[] = [
    { rotationX: 8, rotationY: -16, rotationZ: 3 },
    { rotationX: 6, rotationY: 16, rotationZ: -3 },
];

// Ingezoomd draait het scherm grotendeels naar je toe, anders is het niet te lezen.
const focusTiltFactor = 0;

function sideOf(position: PhonePosition) {
    return position === 'left' ? -1 : position === 'right' ? 1 : 0;
}

// De telefoon heel in beeld op zijn plek, gekanteld naar de tekst.
export function arrivalPose(step: FlowStep, index: number, measure: Measure): Pose {
    if (!measure.isWide) {
        return { x: 0, y: 0, scale: 1, ...narrowTilts[index % narrowTilts.length] };
    }

    const offset = Math.min(measure.stageWidth * offsetRatio, offsetMax);

    return { x: sideOf(step.phone) * offset, y: 0, scale: 1, ...wideTilts[step.phone] };
}

// Ingezoomd op het focuspunt. Twee regels: de bovenkant van de telefoon blijft altijd onder de header zichtbaar, en past hij niet,
// dan valt de onderkant duidelijk weg (zoomt verder in als het maar een randje zou zijn). Groeit de telefoon, dan schuift hij van de tekst weg.
export function focusPose(step: FlowStep, index: number, measure: Measure): Pose {
    const arrival = arrivalPose(step, index, measure);
    if (!step.focus) {
        return arrival;
    }

    const { phoneHeight, regionHeight, topInset } = measure;
    const available = regionHeight - topInset - bottomInset;

    let zoom = step.focus.zoom;
    if (phoneHeight * zoom > available) {
        // Met de bovenkant tegen de header: wat valt er onderaan weg? Te weinig, dan zo ver inzoomen dat het minstens minimumCrop is.
        const crop = topInset + phoneHeight * zoom - regionHeight;
        if (crop < minimumCrop * phoneHeight * zoom) {
            zoom = (regionHeight - topInset) / (phoneHeight * (1 - minimumCrop));
        }
    }
    zoom = Math.min(zoom, renderScale);

    const zoomedHeight = phoneHeight * zoom;
    const fits = zoomedHeight <= available;
    // y = 0 is de telefoon midden in zijn vak; minY houdt de bovenkant onder de header, maxY de onderkant in beeld (als hij past).
    const minY = topInset - regionHeight / 2 + zoomedHeight / 2;
    const maxY = regionHeight / 2 - bottomInset - zoomedHeight / 2;
    const wanted = (0.5 - step.focus.y) * zoomedHeight;
    const y = fits ? Math.min(Math.max(wanted, minY), maxY) : Math.max(wanted, minY);

    const side = measure.isWide ? sideOf(step.phone) : 0;

    return {
        x: arrival.x + (side * measure.phoneWidth * (zoom - 1)) / 2,
        y,
        scale: zoom,
        rotationX: arrival.rotationX * focusTiltFactor,
        rotationY: arrival.rotationY * focusTiltFactor,
        rotationZ: arrival.rotationZ * focusTiltFactor,
    };
}

// GSAP-vars die bij elke refresh (resize) opnieuw worden uitgerekend.
export function poseVars(getPose: () => Pose) {
    return {
        x: () => getPose().x,
        y: () => getPose().y,
        scale: () => getPose().scale / renderScale,
        rotationX: () => getPose().rotationX,
        rotationY: () => getPose().rotationY,
        rotationZ: () => getPose().rotationZ,
    };
}
