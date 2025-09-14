const initHeroState: all.game.HeroEntity = {
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
    skills: {
        shooting: {
            id: "base-shooting",
            name: "Shooting",
            status: "active",
            level: 1,
            progress: 0,
            levelName: "trainee",
            skillType: "shooting",
            pointsToNextLevel: 100,
            bonus: { id: "damage", name: "Damage", value: 0.5 }
        },
    },
    speed: 2,
    state: "player-idle",
    technologies: [],
    timestamp: performance.now(),
    totalHp: 120,
    wearedItems: [],
    xp: 0,
    zIndex: 1,
}

export const createHeroSlice: all.store.CreateHeroSliceType = (set) => ({
    hero: initHeroState,
    setHeroAction: (state: all.game.HeroState) =>
        set((s) => ({ hero: { ...s.hero, state } })),
    setHeroName: (name: string) =>
        set((s) => ({ hero: { ...s.hero, name } })),
    setHeroPosition: (position: all.game.Position) =>
        set((s) => ({ hero: { ...s.hero, position } })),
})
