// types
import type { storeTypes } from "@lib/types"

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

export const createGameSlice: storeTypes.CreateGameSliceType = (set, get) => ({
    ...initState,
    getObjectsMap: () => get().objectsMap,
    setGameAction: (action, payload) => {
        switch (action) {
            case "init":
                set({ init: true })
                break
            case "pause":
                set({ paused: true })
                break
            case "restart":
                set(initState)
                break
            case "play":
                set({ paused: false })
                break
            case "over":
                set({ gameOver: true, paused: true })
                break
            case "resize":
                set({ gameSize: payload })
                break
            case "saveMap":
                set({ objectsMap: payload })
                break
            case "save":
                // TODO: handle save
                break
            case "load":
                // TODO: handle load
                break
        }
    },
})
