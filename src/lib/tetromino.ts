import type { Pos } from "./piece";

export enum Shape { T };

export interface Tetromino {
  shape: Shape;
  orientationUp: (pos: Pos) => Pos[];
  orientationDown: (pos: Pos) => Pos[];
  orientationRight: (pos: Pos) => Pos[];
  orientationLeft: (pos: Pos) => Pos[];
}

export const TetrominoT: Tetromino = {
  shape: Shape.T,

  orientationUp: (pos: Pos): Pos[] => {
    return [
      { x: pos.x, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x + 1, y: pos.y },
      { x: pos.x, y: pos.y - 1 }
    ];
  },

  orientationDown: (pos: Pos): Pos[] => {
    return [
      { x: pos.x, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x + 1, y: pos.y },
      { x: pos.x, y: pos.y + 1 }
    ];
  },

  orientationRight: (pos: Pos): Pos[] => {
    return [
      { x: pos.x, y: pos.y },
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x + 1, y: pos.y }
    ];
  },

  orientationLeft: (pos: Pos): Pos[] => {
    return [
      { x: pos.x, y: pos.y },
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x - 1, y: pos.y }
    ];
  }
};
