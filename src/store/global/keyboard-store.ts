export const createKeyboardSlice: all.store.CreateKeyboardSliceType = (set) => ({
    onKeyDown: () => { },
    onKeyUp: () => { },
    setHandlers: (down, up) => set({ onKeyDown: down, onKeyUp: up }),
})
