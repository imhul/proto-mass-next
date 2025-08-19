import { create } from 'zustand'
import { createNavSlice } from './nav'
// types
import type { NavSlice } from './nav'

export type StoreType = NavSlice | any

export const useStore = create<StoreType>((...a) => ({
    ...createNavSlice({ ...a }),
}))
