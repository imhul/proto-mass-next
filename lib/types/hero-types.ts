import type { RefObject } from 'react'
import type {
    Position,
    Texture,
    Application,
    CameraProps
} from '@lib/types'

export interface HeroProps {
    app?: Application
    position?: Position
    state: HeroState
    ref: RefObject<CameraProps | null>
    onLoad?: () => void
}

export type HeroTexturesObject = { [key in HeroState]: Texture[] }
export type HeroTextures = HeroTexturesObject | null
export type HeroState = "idle" | "run" | "run-shot" | "shoot-up" | "stand" | "hurt" | "lvlup" | "die" | "special" | "transform" | "damage"
export type MovementDirection = "runup" | "rundown" | "runleft" | "runright"