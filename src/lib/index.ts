import { createPiece } from "$lib/piece";
import type { Piece, Pos } from "$lib/piece";
import { Shape, randomShape } from "$lib/tetromino";

type GameState = {
  rows: number,
  cols: number,
  grid: (Shape | null)[][],
  piece: Piece
};

export function init(): GameState {
  const rows = 20;
  const cols = 10;
  const grid = Array<Array<Shape | null>>(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = Array<null>(cols).fill(null);
  }
  const piece = getNewPiece(cols);
  piece.cells.forEach(pos => {
    grid[pos.y][pos.x] = piece.tetromino.shape;
  });

  return { rows: rows, cols: cols, grid: grid, piece: piece };
}

export const isPieceDone = (gs: GameState, p: Piece) =>
		isAtBottom(gs, p) || isCollision(gs, p);

export const getNewPiece = (cols: number) =>
		createPiece({ x: cols / 2 - 1, y: 2 }, randomShape());

export const isOutsideHoriz = (gs: GameState, p: Piece) => 
    p.cells.findIndex(pos => pos.x < 0 || pos.x >= gs.cols) !== -1

export const isSpawnOnPiece = (gs: GameState, p: Piece) =>
  p.cells.findIndex(cell => gs.grid[cell.y][cell.x] !== null) !== -1;

const isAtBottom = (gs: GameState, p: Piece) =>
    p.cells.findIndex(pos => pos.y >= gs.rows) !== -1

const isCollision = (gs: GameState, p: Piece) => {
  const cellInCurrentPiece = (cell: Pos) => gs.piece.cells
      .findIndex(pos => pos.x === cell.x && pos.y === cell.y) !== -1;
  const cellCollision = (cell: Pos) =>
      gs.grid[cell.y][cell.x] !== null && !cellInCurrentPiece(cell);

  return p.cells.findIndex(cellCollision) !== -1;
}
