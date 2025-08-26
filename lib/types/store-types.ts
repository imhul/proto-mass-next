import { StateCreator } from "zustand"
// types
import type {
    gameTypes,
    heroTypes,
    commonTypes,
} from "@lib/types"

// Persisted store
export type PersistedStore = NavSlice & GameSlice & UISlice
// Global store
export type GlobalStore = HeroSlice & KeyboardSlice
//----------------------------------------------
export type ControlsBindings = { [key: string]: (key: string) => void }
export type Controls = "default" & { controls: ControlsBindings }
export type GameActionPayload = (gameTypes.GameObject[] & gameTypes.GameSize) | undefined
export type Hero = { hero: HeroEntity }
export type HeroSlice = Hero & HeroActions
export type HeroActions = { setHeroAction: (action: heroTypes.HeroState) => void }
//----------------------------------------------
export type CreateGameSliceType = StateCreator<
    PersistedStore,
    [["zustand/devtools", never], ["zustand/persist", unknown]],
    [],
    GameSlice
>

export type CreateHeroSliceType = StateCreator<
    GlobalStore,
    [["zustand/devtools", never]],
    [],
    HeroSlice
>

export type CreateKeyboardSliceType = StateCreator<
    GlobalStore,
    [["zustand/devtools", never]],
    [],
    KeyboardSlice
>

export type CreateUISliceType = StateCreator<
    PersistedStore,
    [["zustand/devtools", never]],
    [],
    UISlice
>

export type CreateNavSliceType = StateCreator<
    PersistedStore,
    [["zustand/devtools", never]],
    [],
    NavSlice
>
//----------------------------------------------
export type GameSlice = {
    init: boolean
    paused: boolean
    gameOver: boolean
    gameSize: gameTypes.GameSize
    objectsMap: gameTypes.GameObject[]
    getObjectsMap: () => gameTypes.GameObject[]
    setGameAction: (
        action: gameTypes.GameAction,
        payload?: GameActionPayload
    ) => void
}

export type KeyboardSlice = {
    onKeyDown: ((e: KeyboardEvent) => void) | null
    onKeyUp: ((e: KeyboardEvent) => void) | null
    setHandlers: (
        down: ((e: KeyboardEvent) => void) | null,
        up: ((e: KeyboardEvent) => void) | null,
    ) => void
}

export interface HeroEntity extends gameTypes.BaseEntity {
    speed: number
    preferences: gameTypes.Preferences
    state: heroTypes.HeroState & commonTypes.BaseState
    abilities: any[] // temporary type
    skills: any[] // temporary type
    inventory: any[] // temporary type
    xp: number
    buffs: any[] // temporary type
    debuffs: any[] // temporary type
    achievements: any[] // temporary type
}

export type NavSlice = {
    route: string
    to: (route: string) => void
}

export type UISlice = {
    isDev: boolean
    setIsDev: () => void
}
