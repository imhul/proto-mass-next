import type { RefObject } from 'react'
import type {
    Texture,
    Application,
    gameTypes,
    heroTypes,
    commonTypes,
} from '@lib/types'

export interface HeroProps {
    app?: Application
    position?: commonTypes.Position
    state: heroTypes.HeroState
    ref: RefObject<gameTypes.CameraProps | null>
    onLoad?: () => void
}

export type HeroTexturesObject = { [key in heroTypes.HeroState]: Texture[] }
export type HeroTextures = HeroTexturesObject | null
export type HeroState = "run" | "run-shot" | "shoot-up" | commonTypes.BaseState
export type MovementDirection = "runn" | "runs" | "runw" | "rune" | "runnw" | "runne" | "runsw" | "runse"
