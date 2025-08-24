import { StateCreator } from 'zustand'
// types
import type { HeroSlice } from '@store/hero-store'

export type KeyboardSlice = {
    onKeyDown: ((e: KeyboardEvent) => void) | null
    onKeyUp: ((e: KeyboardEvent) => void) | null
    setHandlers: (
        down: ((e: KeyboardEvent) => void) | null,
        up: ((e: KeyboardEvent) => void) | null
    ) => void
}

export const createKeyboardSlice: StateCreator<
    KeyboardSlice & HeroSlice,
    [["zustand/devtools", never]],
    [],
    KeyboardSlice
> = (set) => ({
    onKeyDown: (e: KeyboardEvent) => { },
    onKeyUp: (e: KeyboardEvent) => { },
    setHandlers: (down, up) => set({ onKeyDown: down, onKeyUp: up }),
})
