// types
import type {
  Theme,
  MenuItem,
  HeroState,
  Breakpoint,
  GameMenuItem,
} from '@lib/types';

export const menu: MenuItem[] = [
  {
    label: "Home",
    id: "home",
  }, {
    label: "Game",
    id: "game",
  },
]

export const gameMenu: GameMenuItem[] = [
  {
    label: "Pause",
    id: "pause"
  }, {
    label: "Restart",
    id: "restart"
  }, {
    label: "Save",
    id: "save"
  }, {
    label: "Load",
    id: "load"
  }, {
    label: "Init",
    id: "init"
  }, {
    label: "Over",
    id: "over"
  }, {
    label: "Play",
    id: "play"
  }
]

export const themeMenu: Theme[] = [
  {
    label: "Light",
    id: "light"
  }, {
    label: "Dark",
    id: "dark"
  }, {
    label: "System",
    id: "system"
  }
]

export const breakpoints: Record<string, Breakpoint> = {
  sm: { id: "sm", value: 430, width: 320, height: 320 },
  md: { id: "md", value: 768, width: 640, height: 480 },
  lg: { id: "lg", value: 1024, width: 800, height: 600 },
  xl: { id: "xl", value: 1280, width: 1024, height: 768 },
}

export const heroTexturesConfig: Record<HeroState, { count: number, uid: number }> = {
  "idle": { count: 4, uid: 31 },
  "run": { count: 10, uid: 41 },
  "run-shot": { count: 10, uid: 51 },
  "shoot-up": { count: 1, uid: 61 },
  "stand": { count: 3, uid: 62 },
  "hurt": { count: 2, uid: 29 },
  "die": { count: 0, uid: 0 },
  "damage": { count: 0, uid: 0 },
  "lvlup": { count: 0, uid: 0 },
  "special": { count: 0, uid: 0 },
  "transform": { count: 0, uid: 0 },
}
