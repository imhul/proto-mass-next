import type {
    Point,
    Texture,
    EventSystem,
    ReactElement,
    AnimatedSprite,
    uiTypes,
    heroTypes,
    commonTypes,
} from '@lib/types'

export type ObjectsProps = { size: GameSize }
export type GameObjectState = commonTypes.BaseState
export type GameDifficulty = "easy" | "normal" | "hard"
export type GameSize = { width: number; height: number }
export type UseMoveProps = { viewportRef: React.RefObject<CameraProps> }
export type GameProps = { parentRef: React.RefObject<HTMLDivElement | null> }
export type PixiChildren = (ReactElement<any, any> | AnimatedSprite | null)[]
export type GameAction = "resize" | "pause" | "restart" | "play" | "save" | "load" | "init" | "over" | "saveMap"

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

export interface Breakpoint {
    id: string
    value: number
    width: number
    height: number
}

export interface CameraProps {
    children: PixiChildren
    events: EventSystem
    gameSize: GameSize
    [key: string]: any
}

export interface ClosestObject {
    position?: commonTypes.Position
    zIndex: number
    width?: number
    height?: number
    name: string
    direction: heroTypes.MovementDirection
}

export interface MaggotProps {
    texture: Texture
    width: number
    height: number
    item: MaggotItem
}

export interface MaggotItem {
    id: number
    speed: number
    direction: number
    turnSpeed: number
    x: number
    y: number
    scale: { x: number; y: number }
    original: Point
}

export interface GameObject extends BaseEntity {
    state: GameObjectState
    texture: number
    dx?: number
    dy?: number
}

export interface Obstacle {
    direction: heroTypes.MovementDirection
    zIndex: number
    label: string
    position: commonTypes.Position
}

export interface CheckObjectCollision {
    collision: boolean
    obstacle?: Obstacle
}
