import { StateCreator } from "zustand"
// types
import type { gameTypes } from "@lib/types"

//----------------------------------------------
// PERSISTED STORE
//----------------------------------------------
export type PersistedStore = NavSlice & GameSlice & UISlice

//----------------------------------------------
// GLOBAL STORE
//----------------------------------------------
export type GlobalStore = HeroSlice & KeyboardSlice

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
// SLICES
//----------------------------------------------
export type GameSlice = {
    init: boolean
    paused: boolean
    gameOver: boolean
    gameSize: gameTypes.BaseSize
    objectsMap: gameTypes.GameObjectEntity[]
    startTimestamp: number
    getObjectsMap: () => gameTypes.GameObjectEntity[]
    setGameAction: (
        action: gameTypes.GameAction,
        payload?: GameActionPayload
    ) => void
}

export type HeroSlice = gameTypes.Hero & HeroActions

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
export type ControlsBindings = { [key: string]: (key: string) => void }
export type Controls = "default" & { controls: ControlsBindings }
export type GameActionPayload = any
export type HeroActions = { setHeroAction: (action: gameTypes.HeroState) => void }
