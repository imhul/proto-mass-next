import { StateCreator } from "zustand"
// types
import type { uiTypes, gameTypes } from "@lib/types"

//----------------------------------------------
// PERSISTED STORE
//----------------------------------------------
export type PersistedStore = NavSlice & GameSlice & UISlice & HeroSlice

//----------------------------------------------
// GLOBAL STORE
//----------------------------------------------
export type GlobalStore = KeyboardSlice

//----------------------------------------------
// SLICE CREATORS
//----------------------------------------------
export type CreateGameSliceType = StateCreator<
    PersistedStore,
    [["zustand/devtools", never], ["zustand/persist", unknown]],
    [],
    GameSlice
>

export type CreateHeroSliceType = StateCreator<
    PersistedStore,
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
// SLICES
//----------------------------------------------
export type GameSlice = {
    init: boolean
    zoom: number
    seed: string | undefined
    paused: boolean
    gameOver: boolean
    gameSize: gameTypes.BaseSize
    water: gameTypes.Position[]
    startTimestamp: number
    preferences: Preferences
    enemies: Record<gameTypes.ColonyEntity["uid"], gameTypes.EnemyEntity[]>
    setGameAction: (
        action: gameTypes.GameAction,
        payload?: GameActionPayload
    ) => void
}

export type HeroSlice = gameTypes.Hero & HeroActions
export type HeroActions = {
    setHeroAction: (action: gameTypes.HeroState) => void
    setHeroPosition: (position: gameTypes.Position) => void
}

export type KeyboardSlice = {
    onKeyDown: ((e: KeyboardEvent) => void) | null
    onKeyUp: ((e: KeyboardEvent) => void) | null
    setHandlers: (
        down: ((e: KeyboardEvent) => void) | null,
        up: ((e: KeyboardEvent) => void) | null,
    ) => void
}

export type NavSlice = {
    route: string
    to: (route: string) => void
}

export type UISlice = {
    isDev: boolean
    setIsDev: () => void
}

//----------------------------------------------
// MISCELLANEOUS
//----------------------------------------------
export type GameActionPayload = any
export type GameKeyboardActionType = "moveup" | "movedown" | "moveleft" | "moveright" | "jump" | "shoot"
export type KeyBindings = Record<GameKeyboardActionType, KeyBinding>

export type KeyBinding = {
    keys: string[]
    codes: string[]
    keyCodes: number[]
}

export type KeyBindingCollectionItem = {
    name: string | number
    keyCode: number
    key: string | number
    code: string
    notes?: string
}

export interface Preferences {
    difficulty: gameTypes.GameDifficultyType
    keyBindings: KeyBindings
    theme: uiTypes.ThemeName
    soundLevel: number
    fullscreen: boolean
}
