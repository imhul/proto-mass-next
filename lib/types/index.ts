import type { ReactElement, ReactNode, JSXElementConstructor } from 'react';
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
// store
import type { PersistedStore, GlobalStore, } from '@/store';
// custom game types
import type * as uiTypes from '@lib/types/ui-types';
import type * as gameTypes from '@lib/types/game-types';
import type * as commonTypes from '@lib/types/common-types';
import type * as heroTypes from '@lib/types/hero-types'
import type * as storeTypes from '@lib/types/store-types'

export type {
    // react
    JSXElementConstructor,
    ReactElement,
    ReactNode,

    // store
    GlobalStore,
    PersistedStore,

    // pixi
    Point,
    Sprite,
    Texture,
    Graphics,
    Viewport,
    Container,
    Application,
    EventSystem,
    TilingSprite as PixiTilingSprite,
    AnimatedSprite,
    PixiReactElementProps,

    // inner
    uiTypes,
    gameTypes,
    heroTypes,
    storeTypes,
    commonTypes,
}
