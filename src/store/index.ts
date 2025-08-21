import { create } from 'zustand'
// middleware
import { devtools } from "zustand/middleware"
// stores
import { createNavSlice } from './nav'
import { createInitSlice } from './init'
// types
import type { NavSlice } from './nav'
import type { InitSlice } from './init'

export type StoreType = NavSlice & InitSlice

export const useStore = create<StoreType>()(
    devtools((...args) => ({
        ...createNavSlice(...args),
        ...createInitSlice(...args),
    }))
)
