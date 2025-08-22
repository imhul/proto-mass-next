import { StateCreator } from 'zustand'
// types
import type { KeyboardSlice } from '@store/keyboard-store'
import type {
    Position,
    HeroState,
    ThemeName,
    GameDifficulty,
} from '@lib/types'

export type HeroEntity = {
    speed: number
    position: Position
    hp: number
    state: HeroState
    xp: number
    buffs: any[]
    debuffs: any[]
    achievements: any[]
    age: number
    characterName: string
    abilities: any[]
    skills: any[]
    inventory: any[]
    preferences: {
        difficulty: GameDifficulty
        controls: string
        theme: ThemeName
        soundLevel: number
        fullscreen: boolean
    }
}

export type ControlsBindings = { [key: string]: (key: string) => void }
export type Controls = "default" & { controls: ControlsBindings }
export type Hero = { hero: HeroEntity }
export type HeroSlice = Hero & HeroActions
export type HeroActions = {
    setHeroAction: (action: HeroState) => void
}

const initHeroState: HeroEntity = {
    speed: 10,
    position: { x: 0, y: 0 },
    hp: 100,
    state: "stand" as HeroState,
    xp: 0,
    buffs: [],
    debuffs: [],
    achievements: [],
    age: 0,
    characterName: "",
    abilities: [],
    skills: [],
    inventory: [],
    preferences: {
        difficulty: "normal" as GameDifficulty,
        controls: "default" as Controls,
        theme: "system" as ThemeName,
        soundLevel: 50,
        fullscreen: false,
    },
}

export const createHeroSlice: StateCreator<
    HeroSlice & KeyboardSlice,
    [["zustand/devtools", never]],
    [],
    HeroSlice
> = (set, get) => ({
    hero: initHeroState,
    setHeroAction: (action: HeroState) => {
        switch (action) {
            // TODO: Hero actions ...
        }
    },
})
