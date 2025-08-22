import { create } from 'zustand'
// middleware
import { devtools, persist } from "zustand/middleware"
// slices
import { createNavSlice, type NavSlice } from './nav-store'
import { createGameSlice, type GameSlice } from './game-store'
import { createHeroSlice, type HeroSlice } from './hero-store'
import { createKeyboardSlice, type KeyboardSlice } from './keyboard-store'

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
export type GlobalStore = HeroSlice & KeyboardSlice

export const useStore = create<GlobalStore>()(
    devtools((...args) => ({
        ...createHeroSlice(...args),
        ...createKeyboardSlice(...args),
    }))
)
