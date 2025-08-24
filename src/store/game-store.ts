import { StateCreator } from 'zustand'
// types
import type { NavSlice } from '@store/nav-store'
import type { UISlice } from '@store/ui-store'
import type { gameTypes } from '@lib/types'

export type GameSlice = {
  init: boolean
  paused: boolean
  gameOver: boolean
  gameSize: gameTypes.GameSize
  objectsMap: gameTypes.GameObject[]
  getObjectsMap: () => gameTypes.GameObject[]
  setGameAction: (action: gameTypes.GameAction, payload?: any) => void
}

const initState = {
  init: false,
  paused: false,
  gameOver: false,
  objectsMap: [],
  gameSize: {
    width: 800,
    height: 600,
  },
}

export const createGameSlice: StateCreator<
  GameSlice & NavSlice & UISlice,
  [["zustand/devtools", never], ["zustand/persist", unknown]],
  [],
  GameSlice
> = (set, get) => ({
  ...initState,
  getObjectsMap: () => get().objectsMap,
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
      case "saveMap":
        set({ objectsMap: payload });
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
