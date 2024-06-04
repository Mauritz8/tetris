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
  const rows = 16;
  const cols = 16;
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

export function updatePiece(gameState: GameState, piece: Piece): void {
  if (isOutsideHoriz(gameState, piece)) return;

  if (isAtBottom(gameState, piece) || isCollision(gameState, piece)) {
    const newPiece = getNewPiece(gameState.cols);
    newPiece.cells.forEach(pos => {
      gameState.grid[pos.y][pos.x] = newPiece.tetromino.shape;
    });
    gameState.piece = newPiece;
    return;
  }


  gameState.piece.cells.forEach(pos => {
    gameState.grid[pos.y][pos.x] = null;
  });

  piece.cells.forEach(pos => {
    gameState.grid[pos.y][pos.x] = piece.tetromino.shape;
  });

  gameState.piece = piece;
}

function getNewPiece(cols: number): Piece {
  return createPiece({ x: cols / 2 - 1, y: 2 }, randomShape()) 
}

const isOutsideHoriz = (gs: GameState, p: Piece) => 
    p.cells.findIndex(pos => pos.x < 0 || pos.x >= gs.cols) !== -1

const isAtBottom = (gs: GameState, p: Piece) =>
    p.cells.findIndex(pos => pos.y >= gs.rows) !== -1

const isCollision = (gs: GameState, p: Piece) => {
  const collision = (cell: (Shape | null), pos: Pos) => {
    return cell !== null && 
        !gs.piece.cells.find(c => c.x === pos.x && c.y === pos.y)
  }

  return p.cells.findIndex(pos => collision(gs.grid[pos.y][pos.x], pos)) !== -1
}
