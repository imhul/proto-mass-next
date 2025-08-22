import type { Position, Texture, Application } from '@lib/types'

export interface HeroProps {
    app?: Application
    position?: Position
    state: HeroState
    ref?: HTMLDivElement
    onLoad?: () => void
}

export type HeroTexturesObject = { [key in HeroState]: Texture[] }
export type HeroTextures = HeroTexturesObject | null
export type HeroState = "idle" | "run" | "run-shot" | "shoot-up" | "stand" | "hurt" | "lvlup" | "die" | "special" | "transform" | "damage"
export type MovementDirection = "stepup" | "stepdown" | "stepleft" | "stepright" | "runup" | "rundown" | "runleft" | "runright"