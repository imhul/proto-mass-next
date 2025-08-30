// types
import type { uiTypes, storeTypes, gameTypes } from "@lib/types"

export const initState = {
    init: false,
    paused: false,
    gameOver: false,
    objectsMap: [],
    startTimestamp: 0,
    gameSize: {
        width: 800,
        height: 600,
    },
    seed: undefined,
    preferences: {
        difficulty: "normal" as gameTypes.GameDifficultyType,
        theme: "system" as uiTypes.ThemeName,
        soundLevel: 50,
        fullscreen: false,
        keyBindings: {
            moveup: {
                keys: ['ArrowUp', 'w'],
                codes: ['ArrowUp', 'KeyW'],
                keyCodes: [87, 38]
            },
            movedown: {
                keys: ['ArrowDown', 's'],
                codes: ['ArrowDown', 'KeyS'],
                keyCodes: [83, 40]
            },
            moveleft: {
                keys: ['ArrowLeft', 'a'],
                codes: ['ArrowLeft', 'KeyA'],
                keyCodes: [65, 37]
            },
            moveright: {
                keys: ['ArrowRight', 'd'],
                codes: ['ArrowRight', 'KeyD'],
                keyCodes: [68, 39]
            },
        }
    },
}

export const createGameSlice: storeTypes.CreateGameSliceType = (set, get) => ({
    ...initState,
    getObjectsMap: () => get().objectsMap,
    setGameAction: (action, payload) => {
        switch (action) {
            case "init":
                set({ init: true, startTimestamp: performance.now() })
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
            case "setSeed":
                set({ seed: payload })
                break
            case "setPref":
                set({ preferences: payload })
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
