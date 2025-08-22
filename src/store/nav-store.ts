import { StateCreator } from 'zustand'
// types
import { GameSlice } from './game-store'

export type NavSlice = {
    route: string
    to: (route: string) => void
}

export const createNavSlice: StateCreator<
    NavSlice & GameSlice,
    [["zustand/devtools", never]],
    [],
    NavSlice
> = (set) => ({
    route: "home",
    to: (route: string) => set({ route }),
})
