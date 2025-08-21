import { StateCreator } from 'zustand'
// types
import { InitSlice } from './init'

export type NavSlice = {
    route: string
    to: (route: string) => void
}

export const createNavSlice: StateCreator<
    NavSlice & InitSlice,
    [["zustand/devtools", never]],
    [],
    NavSlice
> = (set) => ({
    route: "home",
    to: (route: string) => set({ route }),
})
