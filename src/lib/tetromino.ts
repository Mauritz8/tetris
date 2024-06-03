import type { Pos } from "./piece";

export enum Shape { I, T };

export interface Tetromino {
  shape: Shape;
  cells: (pos: Pos) => Pos[];
}

export function getTetromino(shape: Shape): Tetromino {
  switch (shape) {
    case Shape.T:
      return TetrominoT;
    case Shape.I:
      return TetrominoI
  }
}

export const TetrominoT: Tetromino = {
  shape: Shape.T, 
  cells: (pos: Pos) => [
    { x: pos.x, y: pos.y },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 }
  ]
};

export const TetrominoI: Tetromino = {
  shape: Shape.I, 
  cells: (pos: Pos) => [
    { x: pos.x, y: pos.y },
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x + 2, y: pos.y }
  ]
};
