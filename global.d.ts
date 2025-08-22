import { type PixiReactElementProps } from '@pixi/react'
import { type Viewport } from 'pixi-viewport'
import type { TilingSprite } from "pixi.js"

declare module '@pixi/react' {
    interface PixiElements {
        pixiViewport: PixiReactElementProps<typeof Viewport>;
        tilingSprite: PixiReactElementProps<typeof TilingSprite>;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            pixiViewport: any;
            tilingSprite: any;
        }
    }
}
