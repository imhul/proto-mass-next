import type { RefObject, ReactElement, ReactNode, JSXElementConstructor } from 'react';
// pixi
import type { Viewport } from 'pixi-viewport'
import type { PixiReactElementProps } from '@pixi/react'
import type {
    Point,
    Sprite,
    Texture,
    Graphics,
    Container,
    Application,
    EventSystem,
    TilingSprite,
    AnimatedSprite,
} from 'pixi.js';
// custom game types
import type * as uiTypes from '@lib/types/ui-types';
import type * as gameTypes from '@lib/types/game-types';
import type * as storeTypes from '@lib/types/store-types'

export type {
    // react
    ReactNode,
    RefObject,
    ReactElement,
    JSXElementConstructor,

    // pixi
    Point,
    Sprite,
    Texture,
    Graphics,
    Viewport,
    Container,
    Application,
    EventSystem,
    AnimatedSprite,
    PixiReactElementProps,
    TilingSprite as PixiTilingSprite,

    // inner
    uiTypes,
    gameTypes,
    storeTypes,
}
