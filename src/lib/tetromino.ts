import type { Pos } from "./piece";

export enum Shape { I, T, O, J, L, S, Z };

export interface Tetromino {
  shape: Shape;
  cells: (pos: Pos) => Pos[];
}

export function getTetromino(shape: Shape): Tetromino {
  switch (shape) {
    case Shape.T:
      return TetrominoT;
    case Shape.I:
      return TetrominoI;
    case Shape.O:
      return TetrominoO;
    case Shape.J:
      return TetrominoJ;
    case Shape.L:
      return TetrominoL;
    case Shape.S:
      return TetrominoS;
    case Shape.Z:
      return TetrominoZ;
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

export const TetrominoO: Tetromino = {
  shape: Shape.O, 
  cells: (pos: Pos) => [
    { x: pos.x, y: pos.y },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x + 1, y: pos.y + 1 }
  ]
};

export const TetrominoJ: Tetromino = {
  shape: Shape.J, 
  cells: (pos: Pos) => [
    { x: pos.x, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x - 1, y: pos.y + 1 }
  ]
};

export const TetrominoL: Tetromino = {
  shape: Shape.L, 
  cells: (pos: Pos) => [
    { x: pos.x, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
    { x: pos.x + 1, y: pos.y + 1 }
  ]
};

export const TetrominoS: Tetromino = {
  shape: Shape.S, 
  cells: (pos: Pos) => [
		{ x: pos.x, y: pos.y },
		{ x: pos.x - 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x + 1, y: pos.y - 1 },
  ]
};

export const TetrominoZ: Tetromino = {
  shape: Shape.Z, 
  cells: (pos: Pos) => [
		{ x: pos.x, y: pos.y },
		{ x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
		{ x: pos.x - 1, y: pos.y - 1 },
  ]
};
