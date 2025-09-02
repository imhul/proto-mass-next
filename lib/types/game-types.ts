import type {
    Point,
    Texture,
    RefObject,
    EventSystem,
    ReactElement,
    AnimatedSprite,
    CompositeTilemap,
    AnimatedSpriteFrames,
} from '@lib/types'

//----------------------------------------------
// COMPONENTS PROPS
//----------------------------------------------
export type GameProps = { parentRef: React.RefObject<HTMLDivElement | null> }

export interface BulletProps {
    x: number
    y: number
    pointer: { x: number; y: number }
    textures: AnimatedSpriteFrames
    onComplete: () => void
}

export interface CustomTilingSpriteProps {
    tileScale?: { x: number; y: number }
    tilePosition?: { x: number; y: number }
    tilemap: CompositeTilemap | null
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
    ref: RefObject<CameraProps | null>
}

export interface EnemyProps {
    base: Position
    prideState?: PrideState
    item: EnemyEntity | null
    ref: RefObject<CameraProps | null>
    setPrideState: (state: PrideState) => void
}

export interface EnemiesProps {
    ref: RefObject<CameraProps | null>
}

export type DevComponentProps = {
    x: number
    y: number
    width: number
    height: number
    [key: string]: unknown
}

//----------------------------------------------
// ENTITIES
//----------------------------------------------
export interface BaseEntity {
    id: number
    position: Position
    hp: number
    state: BaseState | SummaryState
    age: number
    name: string
    dead: boolean
    timestamp: number
    zIndex: number
}

export interface EnemyEntity extends BaseEntity {
    uid: string
    speed: number
    attackSpeed: number
    attackPower: number
    base: Position
    timestamp: number
    state: EnemyState
}

export interface GameObjectEntity extends BaseEntity {
    state: GameObjectState
    texture: number
}

export interface HeroEntity extends BaseEntity {
    speed: number
    state: HeroState | BaseState
    abilities: any[] // temporary type
    skills: Skill[]
    inventory: any[] // temporary type
    xp: number
    buffs: any[] // temporary type
    debuffs: any[] // temporary type
    achievements: any[] // temporary type
    attackPower: number
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
export type BaseState = "idle" | "die" | "damage" | "transform" | "special"
export type ClosestWater = { dx: number; dy: number }
export type Consumer = "hero" | "enemy"
export type GameAction = "setPref" | "setSeed" | "resize" | "pause" | "restart" | "save" | "load" | "init" | "exit" | "saveWater"
export type GameDifficultyType = "easy" | "normal" | "hard"
export type GameDifficulty = { id: GameDifficultyType, label: string }
export type GameObjectState = BaseState
export type GetTexturesType = (atlasJson: AtlasJSON | null, consumer: Consumer) => TexturesCollection
export type EnemyState = BaseState | "lvlup" | "angry" | "attack" | "run"
export type Hero = { hero: HeroEntity }
export type HeroState =
    "lvlup"
    | "die"
    | "damage"
    | "transform"
    | "special"
    | "player-stand"
    | "player-run"
    | "player-run-shot"
    | "player-shoot-up"
    | "crab-idle"
    | "crab-walk"
    | "enemy-death"
    | "impact"
    | "jumper-idle"
    | "jumper-jump"
    | "octopus"
    | "player-cling"
    | "player-duck"
    | "player-hurt"
    | "player-idle"
    | "player-jump"
    | "player-shoot-up"
    | "power-up"
    | "shot"
export type LevelName = "trainee" | "medium" | "master" | "prime"
export type MovementDirection = "runn" | "runs" | "runw" | "rune" | "runnw" | "runne" | "runsw" | "runse" | "jump" | "shoot" | "shoot-left" | "shoot-right"
export type ObjectsProps = { size: BaseSize }
export type PixiChildren = (ReactElement<any, any> | AnimatedSprite | null)[]
export type Position = { x: number; y: number }
export type PrideState = "idle" | "angry"
export type SummaryState = HeroState | EnemyState
export type TexturesCollection = TexturesObject | null
export type TexturesObject = { [key in SummaryState]: Texture[] }
export type UseMoveProps = { ref: React.RefObject<CameraProps | null> }

export interface Breakpoint {
    id: string
    value: number
    width: number
    height: number
}

export interface Obstacle {
    direction: MovementDirection
    label: string
    position: Position
}

export interface CheckObjectCollision {
    collision: boolean
    obstacle?: Obstacle
}

export type GenerateMap = (params: {
    seed?: string,
    width: number,
    height: number,
    bigClusterPercent: number,
    smallClusterPercent: number,
    materials: number[]
}) => number[][]
