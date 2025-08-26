import type { Texture } from '@lib/types';

export type BaseState = "idle" | "stand" | "hurt" | "lvlup" | "die" | "special" | "transform" | "damage"

export interface BaseItem {
    id: string;
    label: string;
}

export interface Position {
    x: number
    y: number
}

export interface AtlasJSON {
    textures: {
        [key: number]: Texture
    }
}

export interface ErrorProps {
    error: {
        environmentName: string;
        message: string;
        stack: string
    }
}

export interface CustomTilingSpriteProps {
    tileScale?: { x: number; y: number }
    tilePosition?: { x: number; y: number }
}
