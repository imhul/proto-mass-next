// types
import type { storeTypes } from "@lib/types"

export const createKeyboardSlice: storeTypes.CreateKeyboardSliceType = (set) => ({
    onKeyDown: () => { },
    onKeyUp: () => { },
    setHandlers: (down, up) => set({ onKeyDown: down, onKeyUp: up }),
})
