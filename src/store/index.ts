import { create } from "zustand"
// middleware
import { devtools, persist } from "zustand/middleware"
// slices
import { createUISlice } from "@/store/persisted/ui-store"
import { createNavSlice } from "@/store/persisted/nav-store"
import { createGameSlice } from "@/store/persisted/game-store"
import { createHeroSlice } from "@/store/persisted/hero-store"
import { createKeyboardSlice } from "@/store/global/keyboard-store"
// types
import type { storeTypes } from "@lib/types"

export const usePersistedStore = create<storeTypes.PersistedStore>()(
    devtools(
        persist(
            (...args) => ({
                ...createNavSlice(...args),
                ...createGameSlice(...args),
                ...createUISlice(...args),
                ...createHeroSlice(...args),
            }),
            {
                name: "game-local-store",
            },
        ),
    ),
)

export const useStore = create<storeTypes.GlobalStore>()(
    devtools((...args) => ({
        ...createKeyboardSlice(...args),
    })),
)
