// types
import type { storeTypes } from "@lib/types"

export const createNavSlice: storeTypes.CreateNavSliceType = (set) => ({
    route: "home",
    to: (route: string) => set({ route }),
})
