import type {
    Viewport,
    Graphics,
    TilingSprite,
    PixiReactElementProps,
} from "@lib/types"

declare global {
    // eslint-disable-next-line no-var
    var __PIXI_APP__: any
}

declare module '@pixi/react' {
    interface PixiElements {
        pixiViewport: PixiReactElementProps<typeof Viewport>;
        tilingSprite: PixiReactElementProps<typeof TilingSprite>;
        pixiGraphics: PixiReactElementProps<typeof Graphics>;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            pixiViewport: any;
            tilingSprite: any;
            pixiGraphics: any;
        }
    }
}
