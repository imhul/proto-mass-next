import { StateCreator } from "zustand"
// types
import type { uiTypes, gameTypes } from "@lib/types"

//----------------------------------------------
// PERSISTED STORE
//----------------------------------------------
export type PersistedStore = GameSlice & UISlice & HeroSlice

//----------------------------------------------
// GLOBAL STORE
//----------------------------------------------
export type GlobalStore = NavSlice & KeyboardSlice

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
    GlobalStore,
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
    worldName: string
    heroName: string
    playTime: number
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
    setHeroName: (name: string) => void
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
    showObjectHitboxes: boolean
    showEnemyHitboxes: boolean
    showHeroHitbox: boolean
    showDots: boolean
    showFPS: boolean
    isGodMode: boolean
    showCharts: boolean
    showHeroActionMenu: boolean
    showEnemyProgress: boolean
    isDev: () => boolean
    setDev: (id: string | boolean) => void
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
