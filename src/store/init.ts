import { StateCreator } from 'zustand'
// types
import { NavSlice } from './nav'

export type InitSlice = {
  isInit: boolean
  setInit: () => void
}

export const createInitSlice: StateCreator<
  InitSlice & NavSlice,
  [["zustand/devtools", never]],
  [],
  InitSlice
> = (set) => ({
  isInit: false,
  setInit: () => set({ isInit: true }),
})
