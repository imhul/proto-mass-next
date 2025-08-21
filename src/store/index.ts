import { create } from 'zustand'
// middleware
import { devtools, persist } from "zustand/middleware"
// stores
import { createNavSlice } from './nav'
import { createGameSlice } from './game'
// types
import type { NavSlice } from './nav'
import type { GameSlice } from './game'

// Persisted store
export type PersistedStore = NavSlice & GameSlice

export const usePersistedStore = create<PersistedStore>()(
    devtools(
        persist(
            (...args) => ({
                ...createNavSlice(...args),
                ...createGameSlice(...args),
            }),
            {
                name: "game-local-store",
            }
        )
    )
)

// Global store
export type GlobalStore = GameSlice // fake

// export const useStore = create<GlobalStore>()(
//     devtools((...args) => ({
//         ...createNavSlice(...args),
//         ...createInitSlice(...args),
//     }))
// )
