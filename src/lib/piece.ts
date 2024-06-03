import type { Tetromino } from "./tetromino";
import { Shape, getTetromino } from "./tetromino";

export type Pos = { x: number, y: number };
export enum Orientation { UP, DOWN, RIGHT, LEFT };
export type Piece = {
  pos: Pos;
  tetromino: Tetromino;
  cells: Pos[];
};

export function createPiece(pos: Pos, shape: Shape): Piece {
    const tetromino = getTetromino(shape);
    return {
      pos: pos,
      tetromino: tetromino,
      cells: tetromino.cells(pos)
    };
}

export function rotate(p: Piece): Piece {
  const cells = p.cells.map(cell => {
    const xDiff = cell.x - p.pos.x;
    const yDiff = cell.y - p.pos.y;
    if (xDiff === 0 && yDiff === 0) {
      return cell;
    } else if (xDiff < 0 && yDiff === 0) {
      return { x: p.pos.x + yDiff, y: p.pos.y + xDiff };
    } else if (xDiff === 0 && yDiff < 0) {
      return { x: p.pos.x - yDiff, y: p.pos.y + xDiff };
    } else if (xDiff > 0 && yDiff === 0) {
      return { x: p.pos.x + yDiff, y: p.pos.y + xDiff };
    } else if (xDiff === 0 && yDiff > 0) {
      return { x: p.pos.x - yDiff, y: p.pos.y + xDiff };
    } else {
      return cell;
    }
  });

  return { ...p, cells: cells };
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
