import { StateCreator } from 'zustand'
// types
import { NavSlice } from './nav-store'
import type { GameAction, GameSize } from '@lib/types'

export type GameSlice = {
  init: boolean
  paused: boolean
  gameOver: boolean
  gameSize: GameSize
  setGameAction: (action: GameAction, payload?: any) => void
}

const initState = {
  init: false,
  paused: false,
  gameOver: false,
  gameSize: {
    width: 800,
    height: 600,
  },
}

export const createGameSlice: StateCreator<
  GameSlice & NavSlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  GameSlice
> = (set, get) => ({
  ...initState,
  setGameAction: (action, payload) => {
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
      case "resize":
        set({ gameSize: payload });
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
