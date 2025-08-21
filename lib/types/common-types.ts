import type { Texture } from '@lib/types';

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
