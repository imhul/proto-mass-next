import { StateCreator } from "zustand"
// types
import type { GameSlice } from "@store/game-store"
import type { UISlice } from "@store/ui-store"

export type NavSlice = {
    route: string
    to: (route: string) => void
}

export const createNavSlice: StateCreator<
    NavSlice & GameSlice & UISlice,
    [["zustand/devtools", never]],
    [],
    NavSlice
> = (set) => ({
    route: "home",
    to: (route: string) => set({ route }),
})
