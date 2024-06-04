import { createPiece } from "$lib/piece";
import type { Piece, Pos } from "$lib/piece";
import { Shape } from "$lib/tetromino";

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
  const piece = createPiece({ x: cols / 2 - 1, y: 2 }, Shape.Z) 
  piece.cells.forEach(pos => {
    grid[pos.y][pos.x] = piece.tetromino.shape;
  });

  return { rows: rows, cols: cols, grid: grid, piece: piece };
}

export function updatePiece(gameState: GameState, piece: Piece): void {
  if (isOutsideHoriz(gameState, piece)) return;

  if (isAtBottom(gameState, piece) || isCollision(gameState, piece)) {
    const newPiece = createPiece({ x: 4, y: 3 }, Shape.T) 
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
