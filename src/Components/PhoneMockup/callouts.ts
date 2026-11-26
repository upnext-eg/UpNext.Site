import type { ComponentType } from 'react';

import UpNextNotification from './UpNextNotification';

interface Callout {
    Component: ComponentType;
    // Plek op het scherm in de maten van het ontwerp (390 × 844).
    box: { top: number; left: number; right: number };
}

// Elementen die in 3D uit het scherm naar voren komen. Ze liggen boven op de screenshot of placeholder.
// Staat het element ook in het scherm zelf (data-callout-source), dan verdwijnt dat zolang de callout los is.
export const callouts = {
    // Net onder het camera-eiland, zoals in UpNext.Onepager.
    notification: { Component: UpNextNotification, box: { top: 54, left: 12, right: 12 } },
} satisfies Record<string, Callout>;

export type CalloutId = keyof typeof callouts;
