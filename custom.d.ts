import type { TilingSprite } from 'pixi.js'
// declare global {
//     namespace JSX {
//         interface IntrinsicElements {
//             tilingSprite: any
//         }
//     }
// }

interface TilingSpriteProps extends TilingSprite {
    texture: string;
    tileScale?: { x: number; y: number };
    tilePosition?: { x: number; y: number };
    width: number;
    height: number;
}

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'custom-tiling-sprite': TilingSpriteProps;
            // 'tiling-sprite': TilingSpriteProps;
            tilingSprite: any;
        }
    }
}
