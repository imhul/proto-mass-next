import type {
    commonTypes,
    heroTypes,
    uiTypes,
    ReactElement,
    EventSystem,
    AnimatedSprite,
} from '@lib/types'

export type Preferences = {
    difficulty: GameDifficulty
    controls: string
    theme: uiTypes.ThemeName
    soundLevel: number
    fullscreen: boolean
}

export interface BaseEntity {
    id: number | string
    position: commonTypes.Position
    hp: number
    state: commonTypes.BaseState
    age: number
    name: string
    dead: boolean
    timestamp: number
    zIndex: number
}

export interface GameSize {
    width: number
    height: number
}

export interface Breakpoint {
    id: string
    value: number
    width: number
    height: number
}

export type CameraProps = {
    children: PixiChildren
    events: EventSystem
    gameSize: GameSize
    [key: string]: any
}

export type ClosestObject = {
    position: commonTypes.Position
    zIndex: number
    width: number
    height: number
    name: string
} | null
export type GameObjectState = commonTypes.BaseState
export type PixiChildren = (ReactElement<any, any> | AnimatedSprite | null)[]
export type GameAction = "resize" | "pause" | "restart" | "play" | "save" | "load" | "init" | "over" | "saveMap"
export type GameDifficulty = "easy" | "normal" | "hard"
export interface ObjectsProps { size: GameSize }
export interface GameProps { parentRef: React.RefObject<HTMLDivElement | null> }
export interface GameObject extends BaseEntity {
    state: GameObjectState
    texture: number
}
