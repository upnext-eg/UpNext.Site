import type { ComponentType } from 'react';

import CameraScreen from './CameraScreen';
import ChallengeScreen from './ChallengeScreen';
import GroupCreatedScreen from './GroupCreatedScreen';
import StartSessionScreen from './StartSessionScreen';
import TimelineScreen from './TimelineScreen';
import WaitingScreen from './WaitingScreen';
import YourTurnScreen from './YourTurnScreen';

// De app-schermen uit UpNext.Onepager, op 390 × 844. Staat er een screenshot in happyFlow.ts, dan wint die.
export const placeholderScreens = {
    groupCreated: GroupCreatedScreen,
    startSession: StartSessionScreen,
    waiting: WaitingScreen,
    yourTurn: YourTurnScreen,
    challenge: ChallengeScreen,
    camera: CameraScreen,
    timeline: TimelineScreen,
} satisfies Record<string, ComponentType>;

export type ScreenId = keyof typeof placeholderScreens;

export const screenWidth = 390;
export const screenHeight = 844;
