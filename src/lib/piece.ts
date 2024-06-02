import type { Tetromino } from "./tetromino";
import { Shape, TetrominoT } from "./tetromino";

export type Pos = { x: number, y: number };
export enum Orientation { UP, DOWN, RIGHT, LEFT };
export type Piece = {
  pos: Pos;
  orientation: Orientation;
  tetromino: Tetromino;
  cells: Pos[];
};

export function createPiece(pos: Pos, orientation: Orientation, shape: Shape): Piece {
    let tetromino: Tetromino;
    switch (shape) {
      case Shape.T:
        tetromino = TetrominoT;
    }

    let cells: Pos[]; 
    switch (orientation) {
      case Orientation.UP:
        cells = tetromino.orientationUp(pos);
        break;
      case Orientation.DOWN:
        cells = tetromino.orientationDown(pos);
        break;
      case Orientation.RIGHT:
        cells = tetromino.orientationRight(pos);
        break;
      case Orientation.LEFT:
        cells = tetromino.orientationLeft(pos);
        break;
    }

    return {
      pos: pos,
      orientation: orientation,
      tetromino: tetromino,
      cells: cells
    };
}

export function rotate(p: Piece): Piece {
  switch (p.orientation) {
    case Orientation.UP:
      return {
        ...p,
        orientation: Orientation.RIGHT,
        cells: p.tetromino.orientationRight(p.pos)
      };
    case Orientation.RIGHT:
      return {
        ...p,
        orientation: Orientation.DOWN,
        cells: p.tetromino.orientationDown(p.pos)
      };
    case Orientation.DOWN:
      return {
        ...p,
        orientation: Orientation.LEFT,
        cells: p.tetromino.orientationLeft(p.pos)
      };
    case Orientation.LEFT:
      return {
        ...p,
        orientation: Orientation.UP,
        cells: p.tetromino.orientationUp(p.pos)
      };
  }
}

function moveBy(p: Piece, x: number, y: number): Piece {
  return {
    ...p,
    pos: { x: p.pos.x + x, y: p.pos.y + y },
    cells: p.cells.map(pos => {
      return { x: pos.x + x, y: pos.y + y };
    })
  };
}


export const moveRight = (p: Piece) => moveBy(p, 1, 0);
export const moveLeft = (p: Piece) => moveBy(p, -1, 0);
export const moveDown = (p: Piece) => moveBy(p, 0, +1);
