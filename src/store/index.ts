import { create } from "zustand"
// middleware
import { devtools, persist } from "zustand/middleware"
// slices
import { createUISlice } from "@/store/persisted/ui-store"
import { createNavSlice } from "@/store/global/nav-store"
import { createGameSlice } from "@/store/persisted/game-store"
import { createHeroSlice } from "@/store/persisted/hero-store"
import { createKeyboardSlice } from "@/store/global/keyboard-store"

export const usePersistedStore = create<all.store.PersistedStore>()(
    devtools(
        persist(
            (...args) => ({
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

export const useStore = create<all.store.GlobalStore>()(
    devtools((...args) => ({
        ...createNavSlice(...args),
        ...createKeyboardSlice(...args),
    })),
)
