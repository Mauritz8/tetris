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
  const cells = p.cells.map(cell => rotatePoint(p.pos, cell));
  return { ...p, cells: cells };
}

function rotatePoint(center: Pos, point: Pos): Pos {
	const xDiff = point.x - center.x;
	const yDiff = point.y - center.y;
	if ( (xDiff > 0 && yDiff < 0) || (xDiff < 0 && yDiff > 0) ) {
		return { x: point.x, y: center.y - yDiff };
	} else if ( (xDiff < 0 && yDiff < 0) || (xDiff > 0 && yDiff > 0) ) {
		return { x: center.x - xDiff, y: point.y };
	} else if (xDiff === 0 && yDiff !== 0) {
		return { x: center.x - yDiff, y: center.y }; 
	} else if (yDiff === 0 && xDiff !== 0) {
		return { x: center.x, y: center.y + xDiff }; 
	} else {
		return point;
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
