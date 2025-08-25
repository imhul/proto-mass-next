import { create } from "zustand"
// middleware
import { devtools, persist } from "zustand/middleware"
// slices
import { createUISlice, type UISlice } from "@store/ui-store"
import { createNavSlice, type NavSlice } from "@store/nav-store"
import { createGameSlice, type GameSlice } from "@store/game-store"
import { createHeroSlice, type HeroSlice } from "@store/hero-store"
import { createKeyboardSlice, type KeyboardSlice } from "@store/keyboard-store"

// Persisted store
export type PersistedStore = NavSlice & GameSlice & UISlice

export const usePersistedStore = create<PersistedStore>()(
    devtools(
        persist(
            (...args) => ({
                ...createNavSlice(...args),
                ...createGameSlice(...args),
                ...createUISlice(...args),
            }),
            {
                name: "game-local-store",
            },
        ),
    ),
)

// Global store
export type GlobalStore = HeroSlice & KeyboardSlice

export const useStore = create<GlobalStore>()(
    devtools((...args) => ({
        ...createHeroSlice(...args),
        ...createKeyboardSlice(...args),
    })),
)
