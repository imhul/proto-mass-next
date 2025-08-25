import { StateCreator } from "zustand"
// types
import type { KeyboardSlice } from "@store/keyboard-store"
import type { uiTypes, gameTypes, heroTypes, commonTypes } from "@lib/types"

export interface HeroEntity extends gameTypes.BaseEntity {
    speed: number
    preferences: gameTypes.Preferences
    state: heroTypes.HeroState & commonTypes.BaseState
    abilities: any[]
    skills: any[]
    inventory: any[]
    xp: number
    buffs: any[]
    debuffs: any[]
    achievements: any[]
}

export type ControlsBindings = { [key: string]: (key: string) => void }
export type Controls = "default" & { controls: ControlsBindings }
export type Hero = { hero: HeroEntity }
export type HeroSlice = Hero & HeroActions
export type HeroActions = {
    setHeroAction: (action: heroTypes.HeroState) => void
}

const initHeroState: HeroEntity = {
    id: 0,
    speed: 1,
    position: { x: 0, y: 0 },
    hp: 100,
    state: "stand",
    xp: 0,
    buffs: [],
    debuffs: [],
    achievements: [],
    age: 0,
    name: "",
    abilities: [],
    skills: [],
    inventory: [],
    dead: false,
    timestamp: Date.now(),
    zIndex: 1,
    preferences: {
        difficulty: "normal" as gameTypes.GameDifficulty,
        controls: "default" as Controls,
        theme: "system" as uiTypes.ThemeName,
        soundLevel: 50,
        fullscreen: false,
    },
}

export const createHeroSlice: StateCreator<
    HeroSlice & KeyboardSlice,
    [["zustand/devtools", never]],
    [],
    HeroSlice
> = () => ({
    hero: initHeroState,
    setHeroAction: (action: heroTypes.HeroState) => {
        switch (action) {
            // TODO: Hero actions ...
        }
    },
})
