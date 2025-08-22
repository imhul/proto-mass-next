import type { EventSystem, AnimatedSprite, } from '@lib/types'
import type { ReactElement } from 'react';

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

export type PixiChildren = (ReactElement<any, any> | AnimatedSprite | null)[]
export type CameraProps = {
    children: PixiChildren
    events: EventSystem
    gameSize: GameSize
    [key: string]: any
}

export type GameAction = "resize" | "pause" | "restart" | "play" | "save" | "load" | "init" | "over"
export type GameDifficulty = "easy" | "normal" | "hard"
