import { StateCreator } from "zustand"

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
    gameSize: all.game.BaseSize
    water: all.game.Position[]
    startTimestamp: number
    preferences: Preferences
    bullets: all.game.BulletEntity[]
    enemies: Colonies
    setGameAction: (
        action: all.game.GameAction,
        payload?: GameActionPayload
    ) => void
}

export type HeroSlice = all.game.Hero & HeroActions
export type HeroActions = {
    setHeroName: (name: string) => void
    setHeroAction: (action: all.game.HeroState) => void
    setHeroPosition: (position: all.game.Position) => void
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
export type Colonies = Record<all.game.ColonyEntity["uid"], all.game.EnemyEntity[]>
export type GameActionPayload = any
export type GameKeyboardActionType = "moveup" | "movedown" | "moveleft" | "moveright" | "jump" | "shoot" | "pause"
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
    difficulty: all.game.GameDifficultyType
    keyBindings: KeyBindings
    theme: all.ui.ThemeName
    soundLevel: number
    fullscreen: boolean
}
