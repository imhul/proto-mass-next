// types
import type { uiTypes, storeTypes, gameTypes } from "@lib/types"
// config
import { defaultChunkSize, maxColoniesPerChunk } from '@lib/config'

export type Enemies = Record<string, gameTypes.EnemyEntity[]>

export const initState = {
    init: false,
    paused: false,
    gameOver: false,
    water: [],
    startTimestamp: 0,
    gameSize: {
        width: defaultChunkSize * 2,
        height: defaultChunkSize * 2,
    },
    zoom: 1,
    seed: undefined,
    enemies: {},
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
            jump: {
                keys: [' '],
                codes: ['Space'],
                keyCodes: [32]
            },
            shoot: {
                keys: ['f'],
                codes: ['KeyF'],
                keyCodes: [70]
            }
        }
    },
}

export const createGameSlice: storeTypes.CreateGameSliceType = (set, get) => ({
    ...initState,
    setGameAction: (action, payload) => {
        switch (action) {
            case "init":
                set({ init: true, startTimestamp: performance.now() })
                break
            case "pause":
                set({ paused: !get().paused })
                break
            case "restart":
                set(initState)
                break
            case "exit":
                set({ gameOver: true, paused: true })
                break
            case "resize":
                set({ gameSize: payload })
                break
            case "saveWater":
                set({ water: payload })
                break
            case "setSeed":
                set({ seed: payload })
                break
            case "setPref":
                set({ preferences: payload })
                break
            case "setEnemies":
                set({
                    enemies: {
                        ...get().enemies,
                        [payload.colonyUid]: [
                            ...(get().enemies[payload.colonyUid] || []),
                            payload.newEnemy,
                        ],
                    }
                })
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
