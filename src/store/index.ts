import { create } from "zustand"
// middleware
import { devtools, persist } from "zustand/middleware"
// slices
import { createUISlice } from "@store/ui-store"
import { createNavSlice } from "@store/nav-store"
import { createGameSlice } from "@store/game-store"
import { createHeroSlice } from "@store/hero-store"
import { createKeyboardSlice } from "@store/keyboard-store"
// types
import type { storeTypes } from "@lib/types"

export const usePersistedStore = create<storeTypes.PersistedStore>()(
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

export const useStore = create<storeTypes.GlobalStore>()(
    devtools((...args) => ({
        ...createHeroSlice(...args),
        ...createKeyboardSlice(...args),
    })),
)
