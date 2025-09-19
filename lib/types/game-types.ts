//----------------------------------------------
// COMPONENTS PROPS
//----------------------------------------------
export type GameProps = { parentRef: all.react.RefObject<HTMLDivElement | null> }
export type UseGameLoopProps = { ref: all.react.RefObject<all.view.Viewport | null> }

export interface BulletProps extends BulletEntity {
    ref: all.react.RefObject<all.view.Viewport | null>
    textures: all.pixi.AnimatedSpriteFrames
    onComplete: () => void
}

export interface BulletsProps {
    ref: all.react.RefObject<all.view.Viewport | null>
}

export interface CustomTilingSpriteProps {
    tileScale?: { x: number; y: number }
    tilePosition?: { x: number; y: number }
    tilemap: all.map.CompositeTilemap | null
}

export interface CustomGifSpriteProps {
    url: string
    scale?: number
    loop?: boolean
    auto?: boolean
    speed?: number
    position: Position
    onComplete: () => void
}

export interface EnemyBaseProps {
    isBirth: boolean
    isDeath: boolean
    pos: Position
    uid: string
}

export interface ExplosionProps {
    position: Position
    scale: number
    onComplete: () => void
}

export interface ProgressBarProps {
    min: number
    max: number
    current: number
    position?: Position
}

export interface CameraProps {
    children: PixiChildren
    events: all.pixi.EventSystem
    gameSize: BaseSize
    [key: string]: any
}

export interface MaggotProps {
    texture: all.pixi.Texture
    width: number
    height: number
    item: MaggotEntity
}

export interface HeroProps {
    ref: all.react.RefObject<all.view.Viewport | null>
}

export interface EnemyProps {
    base: Position
    item: EnemyEntity | null
    ref: all.react.RefObject<all.view.Viewport | null>
}

export interface EnemiesProps {
    ref: all.react.RefObject<all.view.Viewport | null>
}

export interface ColonyProps {
    ref: all.react.RefObject<all.view.Viewport | null>
    colony: ColonyEntity
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
    age: number
    dead: boolean
    hp: number
    id: number | string
    name: string
    position: Position
    state: BaseState | SummaryState
    timestamp: number
    totalHp: number
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
    colony: ColonyEntity
    damage: number
}

export interface ColonyEntity {
    id: number
    uid: string
}

export interface GameObjectEntity extends BaseEntity {
    state: GameObjectState
    texture: number
    damage: number
    obstacle: boolean
}

export interface HeroEntity extends BaseEntity {
    abilities: any[] // temporary type
    achievements: any[] // temporary type
    attackPower: number
    buffs: any[] // temporary type
    damage: number
    debuffs: any[] // temporary type
    inventory: any[] // temporary type
    itemsStorage: any[] // temporary type
    lvl: number
    pointsToNextLevel: number
    professions: any[] // temporary type
    shooting: number
    skills: Record<string, Skill>
    speed: number
    state: HeroState | BaseState
    technologies: any[] // temporary type
    wearedItems: any[] // temporary type
    xp: number
}

export interface MaggotEntity {
    id: number
    speed: number
    direction: number
    turnSpeed: number
    x: number
    y: number
    scale: { x: number; y: number }
    original: all.pixi.Point
}

export interface BulletEntity {
    id: string
    x: number
    y: number
    owner: "hero" | "enemy"
    direction: { x: number; y: number }
    speed: number
    damage: number
    distance: number
}

export interface Bonus {
    id: string
    name: string
    value: number
}

export interface Skill {
    id: string
    name: string
    status: string
    progress: number
    level: number
    levelName: LevelName
    pointsToNextLevel: number
    bonus: Bonus
    skillType: SkillType
}

export interface Technology {
    id: string
    name: string
    status: string
    progress: number
    level: number
    levelName: LevelName
    pointsToNextLevel: number
    bonus: Bonus
}

export interface Profession {
    id: string
    name: ProfessionType
    status: string
    progress: number
    level: number
    levelName: LevelName
    pointsToNextLevel: number
    bonus: Bonus
}

//----------------------------------------------
// MISCELLANEOUS
//----------------------------------------------
export type AtlasJSON = { textures: { [key: number | string]: all.pixi.Texture } }
export type BaseSize = { width: number; height: number }
export type BaseState = "idle" | "die" | "damage" | "transform" | "special"
export type ClosestWater = { dx: number; dy: number }
export type Construction =
    | 'base'
    | 'auto-turret'
    | 'turret'
    | 'nano-lab'
    | 'melter'
    | 'mega-factory'
    | 'factory'
    | 'mini-factory'
    | 'fabricator'
    | 'calibrator'
    | 'mega-power-plant'
    | 'power-plant'
    | 'power-storage'
export type Consumer = "hero" | "enemy"
export type GameAction =
    "setColonyState"
    | "removeBullet"
    | "addBullet"
    | "updateEnemy"
    | "removeEnemy"
    | "removeColony"
    | "setHeroName"
    | "setWorldName"
    | "setEnemies"
    | "setPref"
    | "setSeed"
    | "resize"
    | "pause"
    | "resume"
    | "restart"
    | "init"
    | "exit"
    | "saveWater"
export type GameDifficultyType = "easy" | "normal" | "hard"
export type GameDifficulty = { id: GameDifficultyType, label: string }
export type GameObjectState = BaseState & ("grow" | "repair")
export type GetTexturesType = (atlasJson: AtlasJSON | null, consumer: Consumer) => TexturesCollection
export type GMap = number[][]
export type EnemyState = "idle" | "lvlup" | "angry" | "run"
export type Hero = { hero: HeroEntity }
export type PixiElementInstance = all.pixi.Container<all.pixi.ContainerChild> | null
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
export type JumpDirection = "left" | "right" | "up"
export type LevelName = "trainee" | "medium" | "master" | "prime"
export type MovementDirection =
    "runn"
    | "runs"
    | "runw"
    | "rune"
    | "runnw"
    | "runne"
    | "runsw"
    | "runse"
    | "jump"
    | "shoot"
    | "shoot-left"
    | "shoot-right"
export type ObjectsProps = { size: BaseSize }
export type PixiChildren = (all.react.ReactElement<any, any> | all.pixi.AnimatedSprite | null)[]
export type Position = { x: number; y: number }
export type ProfessionLevel =
    | 'trainee'
    | 'junior'
    | 'middle'
    | 'senior'
    | 'architect'
    | 'master'
    | 'legendary'
export type ProfessionType =
    | 'collector'
    | 'constructor'
    | 'defender'
    | 'warrior'
    | 'explorer'
    | 'harvester'
    | 'miner'
    | 'crafter'
    | 'researcher'
    | 'healer'
    | 'bearer'
    | 'any'
export type EnemyColonyState = "idle" | "angry"
export type SkillType = "shooting" | "defense" | "speed" | "health" | "critical-chance" | "critical-damage" | "crafting" | "mining" | "harvesting" | "building" | "research" | "healing"
export type SummaryState = HeroState | EnemyState
export type TaskStatus =
    | 'accepted'
    | 'paused'
    | 'continued'
    | 'await'
    | 'complete'
    | 'progress'
    | 'failed'
    | 'canceled'
export type TaskType =
    | 'collect'
    | 'construct'
    | 'deconstruct'
    | 'repair'
    | 'upgrade'
    | 'attack'
    | 'move'
    | 'patrol'
    | 'explore'
    | 'harvest'
    | 'mine'
    | 'craft'
    | 'research'
    | 'heal'
    | 'carrying'
    | 'cancel'
export type TexturesCollection = TexturesObject | null
export type TexturesObject = { [key in SummaryState]: all.pixi.Texture[] }
export type UseMoveProps = { ref: React.RefObject<all.view.Viewport | null> }

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
}) => GMap
