import type {
    Viewport,
    Graphics,
    Container,
    PixiTilingSprite,
    PixiReactElementProps,
} from "@lib/types"

declare global {
    // eslint-disable-next-line no-var
    var __PIXI_APP__: any
}

declare module '@pixi/react' {
    interface PixiElements {
        pixiViewport: PixiReactElementProps<typeof Viewport>;
        tilingSprite: PixiReactElementProps<typeof PixiTilingSprite>;
        pixiGraphics: PixiReactElementProps<typeof Graphics>;
        primitive: PixiReactElementProps<typeof Container>;
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            pixiViewport: any;
            tilingSprite: any;
            pixiGraphics: any;
            primitive: any;
        }
    }
}
