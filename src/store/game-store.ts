import { StateCreator } from 'zustand'
// types
import { NavSlice } from './nav-store'
import type { GameAction } from '@lib/types'

export type GameSlice = {
  init: boolean
  paused: boolean
  gameOver: boolean
  setGameAction: (action: GameAction) => void
}

const initState = {
  init: false,
  paused: false,
  gameOver: false,
}

export const createGameSlice: StateCreator<
  GameSlice & NavSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  GameSlice
> = (set, get) => ({
  ...initState,
  setGameAction: (action: GameAction) => {
    switch (action) {
      case "init":
        set({ init: true });
        break;
      case "pause":
        set({ paused: true });
        break;
      case "restart":
        set(initState);
        break;
      case "play":
        set({ paused: false });
        break;
      case "over":
        set({ gameOver: true, paused: true });
        break;
      case "save":
        // TODO: handle save
        break;
      case "load":
        // TODO: handle load
        break;
    }
  },
})
