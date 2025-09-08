// types
import type { gameTypes, storeTypes } from "@lib/types"

const initHeroState: gameTypes.HeroEntity = {
    abilities: [],
    achievements: [],
    age: 0,
    attackPower: 7,
    buffs: [],
    damage: 0,
    dead: false,
    debuffs: [],
    hp: 100,
    id: 0,
    inventory: [],
    itemsStorage: [],
    lvl: 1,
    name: "",
    pointsToNextLevel: 0,
    position: { x: 0, y: 0 },
    professions: [],
    skills: [],
    speed: 1,
    state: "player-idle",
    technologies: [],
    timestamp: performance.now(),
    wearedItems: [],
    xp: 0,
    zIndex: 1,
}

export const createHeroSlice: storeTypes.CreateHeroSliceType = (set) => ({
    hero: initHeroState,
    setHeroAction: (state: gameTypes.HeroState) =>
        set((s) => ({ hero: { ...s.hero, state } })),
    setHeroName: (name: string) =>
        set((s) => ({ hero: { ...s.hero, name } })),
    setHeroPosition: (position: gameTypes.Position) =>
        set((s) => ({ hero: { ...s.hero, position } })),
})
