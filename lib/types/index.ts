import type { Texture, Application, EventSystem } from 'pixi.js';
import type { PersistedStore, GlobalStore, } from '@store';
import {
  LinkProps,
  ThemeName,
  Theme,
  MenuItem,
  GameMenuItem,
} from '@lib/types/ui-types';
import type {
  GameSize,
  GameProps,
  Breakpoint,
  GameAction,
  CameraProps,
  GameDifficulty,
} from '@lib/types/game-types';
import type {
  BaseItem,
  Position,
  AtlasJSON,
} from '@lib/types/common-types';
import type {
  HeroState,
  HeroTextures,
  HeroProps,
  MovementDirection,
  HeroTexturesObject,
} from '@lib/types/hero-types'

export type {
  // store
  GlobalStore,
  PersistedStore,

  // common
  Texture,
  BaseItem,
  Position,
  AtlasJSON,
  Application,
  EventSystem,

  // UI
  LinkProps,
  ThemeName,
  Theme,
  MenuItem,
  GameMenuItem,

  // game
  GameSize,
  Breakpoint,
  GameAction,
  GameProps,
  CameraProps,
  GameDifficulty,

  // hero
  HeroState,
  HeroTextures,
  HeroProps,
  MovementDirection,
  HeroTexturesObject,
}
