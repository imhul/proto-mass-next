import type { EventSystem } from '@lib/types'
import type { ReactNode } from 'react';

export interface GameSize {
    width: number
    height: number
}

export interface GameProps {
    parentRef: React.RefObject<HTMLDivElement | null>
}

export interface Breakpoint {
    id: string;
    value: number;
    width: number;
    height: number;
}

export type CameraProps = {
    children: ReactNode
    events: EventSystem
    gameSize: GameSize
    [key: string]: any
}

export type GameAction = "pause" | "restart" | "play" | "save" | "load" | "init" | "over"
export type GameDifficulty = "easy" | "normal" | "hard"
