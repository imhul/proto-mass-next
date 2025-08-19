// types
import type { Breakpoint } from './types';

export const config = {
  menu: [
    {
      label: "Home",
      id: "/",
    },
    {
      label: "About",
      id: "/about",
    },
    {
      label: "Game",
      id: "/game",
    },
  ],
}

export const breakpoints: Record<string, Breakpoint> = {
  sm: { id: "sm", value: 430, width: 320, height: 320 },
  md: { id: "md", value: 768, width: 640, height: 480 },
  lg: { id: "lg", value: 1024, width: 800, height: 600 },
  xl: { id: "xl", value: 1280, width: 1024, height: 768 },
};
