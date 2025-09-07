// types
import type { storeTypes } from "@lib/types"

const initUIState = {
    showObjectHitboxes: false,
    showEnemyHitboxes: false,
    showHeroHitbox: false,
    showDots: false,
    showFPS: false,
    isGodMode: false,
    showCharts: false,
    showHeroActionMenu: false,
    showEnemyProgress: false,
}

export const createUISlice: storeTypes.CreateUISliceType = (set, get) => ({
    ...initUIState,
    isDev: () => Boolean(
        get().showObjectHitboxes ||
        get().showEnemyHitboxes ||
        get().showHeroHitbox ||
        get().showDots ||
        get().showFPS ||
        get().isGodMode ||
        get().showCharts ||
        get().showHeroActionMenu ||
        get().showEnemyProgress
    ),
    setDev: (id: string | boolean) => set((s) => {
        switch (id) {
            case "object-hitboxes":
                return ({ showObjectHitboxes: !s.showObjectHitboxes, })
            case "enemy-hitboxes":
                return ({ showEnemyHitboxes: !s.showEnemyHitboxes, })
            case "hero-hitbox":
                return ({ showHeroHitbox: !s.showHeroHitbox, })
            case "dots":
                return ({ showDots: !s.showDots, })
            case "fps":
                return ({ showFPS: !s.showFPS, })
            case "god-mode":
                return ({ isGodMode: !s.isGodMode, })
            case "charts":
                return ({ showCharts: !s.showCharts, })
            case "hero-action-menu":
                return ({ showHeroActionMenu: !s.showHeroActionMenu, })
            case "enemy-progress":
                return ({ showEnemyProgress: !s.showEnemyProgress, })
            default:
                return ({})
        }
    }),
})
