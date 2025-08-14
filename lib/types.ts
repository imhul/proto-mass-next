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

export type MovementDirection = "stepup" | "stepdown" | "stepleft" | "stepright" | "runup" | "rundown" | "runleft" | "runright";
