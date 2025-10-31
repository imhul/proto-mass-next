
export const initState = {
    idleSFXCount: 0,
    attackSFXCount: 0,
}

export const createAudioSlice: all.store.CreateAudioSliceType = (set, get) => ({
    ...initState,
    setAudioAction: (action, payload) => {
        switch (action) {
            case "playIdleSFX":
                set((s) => ({
                    idleSFXCount: s.idleSFXCount + 1,
                }))
                break
            case "stopIdleSFX":
                set((s) => ({
                    idleSFXCount: s.idleSFXCount > 0 ? s.idleSFXCount - 1 : 0,
                }))
                break
            case "playAttackSFX":
                set((s) => ({
                    attackSFXCount: s.attackSFXCount + 1,
                }))
                break
            case "stopAttackSFX":
                set((s) => ({
                    attackSFXCount: s.attackSFXCount > 0 ? s.attackSFXCount - 1 : 0,
                }))
                break
        }
    }
})
