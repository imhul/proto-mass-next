import type * as reactTypes from 'react'
import type * as pixiTypes from 'pixi.js'
import type * as tilemapTypes from '@pixi/tilemap'
import type * as pixiReactTypes from '@pixi/react'
import type * as viewTypes from 'pixi-viewport'
import type * as gifTypes from 'pixi.js/gif'
import type * as uiTypes from '@lib/types/ui-types'
import type * as gameTypes from '@lib/types/game-types'
import type * as storeTypes from '@lib/types/store-types'

declare global {
    // eslint-disable-next-line no-var
    var __PIXI_APP__: any
}

declare module '@pixi/react' {
    interface PixiElements {
        pixiViewport: pixiReactTypes.PixiReactElementProps<typeof viewTypes.Viewport>
        tilingSprite: pixiReactTypes.PixiReactElementProps<typeof tilemapTypes.TilingSprite>
        pixiGraphics: pixiReactTypes.PixiReactElementProps<typeof pixiTypes.Graphics>
        pixiGifSprite: pixiReactTypes.PixiReactElementProps<typeof pixiTypes.GifSprite>
        primitive: pixiReactTypes.PixiReactElementProps<typeof pixiTypes.Container>
    }
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            pixiViewport: any
            tilingSprite: any
            pixiGraphics: any
            pixiGifSprite: any
            primitive: any
        }
    }
}

declare global {
    namespace all {
        export import react = reactTypes
        export import pixi = pixiTypes
        export import map = tilemapTypes
        export import pixiReact = pixiReactTypes
        export import view = viewTypes
        export import ui = uiTypes
        export import game = gameTypes
        export import store = storeTypes
        export import gif = gifTypes
    }
}
