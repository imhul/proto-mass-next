import type { Texture, Application } from 'pixi.js';

export interface Position {
  x: number
  y: number
}

export interface GameSize {
  width: number
  height: number
}

export interface Breakpoint {
  id: string;
  value: number;
  width: number;
  height: number;
}

export interface HeroClientProps {
  app?: Application;
  position?: Position;
  state: HeroState;
}

export interface OutputProps {
  parentRef: React.RefObject<HTMLDivElement | null>;
  heroState: HeroState;
  texture: Texture;
  position: Position;
}

export interface AtlasJSON {
  textures: {
    [key: number]: Texture
  }
}

export type HeroTexturesObject = { [key in HeroState]: Texture[] }
export type HeroTextures = HeroTexturesObject | null
export type HeroState = "idle" | "run" | "run-shot" | "shoot-up" | "stand" | "hurt";
export type MovementDirection = "stepup" | "stepdown" | "stepleft" | "stepright" | "runup" | "rundown" | "runleft" | "runright";
