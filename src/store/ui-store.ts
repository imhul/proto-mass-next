import { StateCreator } from 'zustand'
// types
import type { GameSlice } from '@store/game-store'
import type { NavSlice } from '@store/nav-store'

export type UISlice = {
    isDev: boolean
    setIsDev: () => void
}

export const createUISlice: StateCreator<
    UISlice & GameSlice & NavSlice,
    [["zustand/devtools", never]],
    [],
    UISlice
> = (set, get) => ({
    isDev: false,
    setIsDev: () => set((state) => ({ isDev: !state.isDev })),
})
