// types
import type { uiTypes, gameTypes, storeTypes } from "@lib/types"

const initHeroState: gameTypes.HeroEntity = {
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
    timestamp: performance.now(),
    zIndex: 1,
    attackPower: 7,
}

export const createHeroSlice: storeTypes.CreateHeroSliceType = () => ({
    hero: initHeroState,
    setHeroAction: (action: gameTypes.HeroState) => {
        switch (action) {
            // TODO: Hero actions ...
        }
    },
})
