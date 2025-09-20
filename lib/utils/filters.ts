import {
    GodrayFilter,
    PixelateFilter,
    MotionBlurFilter,
    DropShadowFilter,
} from 'pixi-filters'

const dropShadowFilterSettings = {
    alpha: 0.85,
    color: 0x000000,
    blur: 3,
    quality: 3,
    shadowOnly: false,
}

export const dropShadowFilter = {
    hero: new DropShadowFilter({
        ...dropShadowFilterSettings,
        alpha: 0.5,
        offset: { x: -15, y: 20 },
    }),
    enemy: new DropShadowFilter({
        ...dropShadowFilterSettings,
        offset: { x: -5, y: 10 },
    }),
    object: new DropShadowFilter({
        ...dropShadowFilterSettings,
        alpha: 0.5,
        offset: { x: -5, y: 5 },
    }),
    enemyBase: new DropShadowFilter({
        ...dropShadowFilterSettings,
        offset: { x: -20, y: 15 },
    })
}

export const pixelateFilter = new PixelateFilter(2)
export const godrayFilter = new GodrayFilter({})
export const motionBlurFilter = new MotionBlurFilter({
    offset: 0,
    kernelSize: 2,
    velocity: [10, 10]
})

