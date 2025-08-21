import type { Position, Texture, Application } from '@lib/types';

export interface HeroClientProps {
    app?: Application;
    position?: Position;
    state: HeroState;
}

export type HeroTexturesObject = { [key in HeroState]: Texture[] }
export type HeroTextures = HeroTexturesObject | null
export type HeroState = "idle" | "run" | "run-shot" | "shoot-up" | "stand" | "hurt";
export type MovementDirection = "stepup" | "stepdown" | "stepleft" | "stepright" | "runup" | "rundown" | "runleft" | "runright";