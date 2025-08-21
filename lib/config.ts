// types
import type { Breakpoint, Theme, MenuItem, GameMenuItem } from './types';

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
};
