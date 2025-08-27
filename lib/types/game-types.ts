import type {
    Point,
    Texture,
    RefObject,
    Application,
    EventSystem,
    ReactElement,
    AnimatedSprite,
    uiTypes,
} from '@lib/types'

//----------------------------------------------
// COMPONENTS PROPS
//----------------------------------------------
export interface CustomTilingSpriteProps {
    tileScale?: { x: number; y: number }
    tilePosition?: { x: number; y: number }
}

export interface CameraProps {
    children: PixiChildren
    events: EventSystem
    gameSize: BaseSize
    [key: string]: any
}

export interface MaggotProps {
    texture: Texture
    width: number
    height: number
    item: MaggotEntity
}

export interface HeroProps {
    app?: Application
    position?: Position
    state: HeroState
    ref: RefObject<CameraProps | null>
    onLoad?: () => void
}

export interface EnemyProps {
    app?: Application
    position?: Position
    prideState?: PrideState
    ref: RefObject<CameraProps | null>
    onLoad?: () => void
}

//----------------------------------------------
// ENTITIES
//----------------------------------------------
export interface BaseEntity {
    id: number | string
    position: Position
    hp: number
    state: BaseState
    age: number
    name: string
    dead: boolean
    timestamp: number
    zIndex: number
}

export interface EnemyEntity extends BaseEntity {
    speed: number
    direction: MovementDirection
    attackPower: number
}

export interface GameObjectEntity extends BaseEntity {
    state: GameObjectState
    texture: number
    dx?: number
    dy?: number
}

export interface HeroEntity extends BaseEntity {
    speed: number
    preferences: Preferences
    state: HeroState & BaseState
    abilities: any[] // temporary type
    skills: Skill[]
    inventory: any[] // temporary type
    xp: number
    buffs: any[] // temporary type
    debuffs: any[] // temporary type
    achievements: any[] // temporary type
}

export interface MaggotEntity {
    id: number
    speed: number
    direction: number
    turnSpeed: number
    x: number
    y: number
    scale: { x: number; y: number }
    original: Point
}

export interface Skill {
    id: string
    name: string
    status: string
    progress: string
    level: number
    levelName: LevelName
    pointsToNextLevel: number
    bonus: {
        id: string,
        name: string,
        value: number,
    }
}

//----------------------------------------------
// MISCELLANEOUS
//----------------------------------------------
export type AtlasJSON = { textures: { [key: number | string]: Texture } }
export type BaseSize = { width: number; height: number }
export type BaseState = "idle" | "stand" | "hurt" | "lvlup" | "die" | "special" | "transform" | "damage"
export type Consumer = "hero" | "enemy"
export type GameAction = "resize" | "pause" | "restart" | "play" | "save" | "load" | "init" | "over" | "saveMap"
export type GameDifficulty = "easy" | "normal" | "hard"
export type GameObjectState = BaseState
export type GameProps = { parentRef: React.RefObject<HTMLDivElement | null> }
export type GetTexturesType = (atlasJson: AtlasJSON | null, consumer: Consumer) => TexturesCollection
export type EnemyState = BaseState | "angry" | "attack"
export type Hero = { hero: HeroEntity }
export type HeroState = BaseState | "run" | "run-shot" | "shoot-up"
export type LevelName = "trainee" | "medium" | "master" | "prime"
export type MovementDirection = "runn" | "runs" | "runw" | "rune" | "runnw" | "runne" | "runsw" | "runse"
export type ObjectsProps = { size: BaseSize }
export type PixiChildren = (ReactElement<any, any> | AnimatedSprite | null)[]
export type Position = { x: number; y: number }
export type PrideState = "idle" | "angry"
export type SummaryState = BaseState | HeroState | EnemyState
export type TexturesCollection = TexturesObject | null
export type TexturesObject = { [key in SummaryState]: Texture[] }
export type UseMoveProps = { viewportRef: React.RefObject<CameraProps> }

export interface Preferences {
    difficulty: GameDifficulty
    controls: string
    theme: uiTypes.ThemeName
    soundLevel: number
    fullscreen: boolean
}

export interface Breakpoint {
    id: string
    value: number
    width: number
    height: number
}

export interface ClosestObject {
    position?: Position
    zIndex: number
    width?: number
    height?: number
    name: string
    direction: MovementDirection
}

export interface Obstacle {
    direction: MovementDirection
    zIndex: number
    label: string
    position: Position
}

export interface CheckObjectCollision {
    collision: boolean
    obstacle?: Obstacle
}
