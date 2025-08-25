import type { ReactElement, ReactNode } from 'react';
// pixi
import type { Viewport } from 'pixi-viewport'
import type { PixiReactElementProps } from '@pixi/react'
import type {
    Point,
    Sprite,
    Texture,
    Graphics,
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

export type {
    // react
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
    Application,
    EventSystem,
    TilingSprite,
    AnimatedSprite,
    PixiReactElementProps,

    // inner
    uiTypes,
    gameTypes,
    heroTypes,
    commonTypes,
}
