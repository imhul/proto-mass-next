import type { Texture } from 'pixi.js';
import { HeroState } from '@lib/types//hero-types';
import { Position } from '@lib/types/common-types';

export interface GameSize {
    width: number
    height: number
}

export interface OutputProps {
    parentRef: React.RefObject<HTMLDivElement | null>;
    heroState: HeroState;
    texture: Texture;
    position: Position;
}

export interface Breakpoint {
    id: string;
    value: number;
    width: number;
    height: number;
}

export type GameAction = "pause" | "restart" | "play" | "save" | "load" | "init" | "over"
