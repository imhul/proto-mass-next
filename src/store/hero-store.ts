// types
import type { uiTypes, gameTypes, gameTypes, storeTypes } from "@lib/types"

const initHeroState: storeTypes.HeroEntity = {
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
        controls: "default" as storeTypes.Controls,
        theme: "system" as uiTypes.ThemeName,
        soundLevel: 50,
        fullscreen: false,
    },
}

export const createHeroSlice: storeTypes.CreateHeroSliceType = () => ({
    hero: initHeroState,
    setHeroAction: (action: gameTypes.HeroState) => {
        switch (action) {
            // TODO: Hero actions ...
        }
    },
})
