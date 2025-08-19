// import { ExtractState } from 'zustand'

export const createNavSlice = (set: any) => ({
    route: "home",
    to: (route: string) => set({ route }),
})

export type NavSlice = {
    route: string
    to: (route: string) => void
}
