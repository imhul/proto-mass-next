// types
import type { storeTypes } from "@lib/types"

export const createUISlice: storeTypes.CreateUISliceType = (set) => ({
    isDev: false,
    setIsDev: () => set((state) => ({ isDev: !state.isDev })),
})
