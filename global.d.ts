import type {
    Viewport,
    Graphics,
    TilingSprite,
    PixiReactElementProps,
} from "@lib/types"

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
