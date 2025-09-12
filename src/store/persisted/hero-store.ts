// types
import type { gameTypes, storeTypes } from "@lib/types"

const initHeroState: gameTypes.HeroEntity = {
    abilities: [],
    achievements: [],
    age: 0,
    attackPower: 7,
    buffs: [],
    damage: 1,
    dead: false,
    debuffs: [],
    hp: 120,
    id: 0,
    inventory: [],
    itemsStorage: [],
    lvl: 1,
    name: "",
    pointsToNextLevel: 0,
    position: { x: 0, y: 0 },
    professions: [],
    shooting: 2,
    skills: {},
    speed: 2,
    state: "player-idle",
    technologies: [],
    timestamp: performance.now(),
    totalHp: 120,
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
