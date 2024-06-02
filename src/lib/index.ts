import { Shape, Orientation, createPiece } from "$lib/piece";
import type { Piece } from "$lib/piece";

type GameState = { grid: (Shape | null)[][], piece: Piece };

export function init(): GameState {
  const rows = 16;
  const cols = 16;
  const grid = Array<Array<Shape | null>>(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = Array<null>(cols).fill(null);
  }
  const piece = createPiece({ x: 4, y: 3 }, Orientation.RIGHT, Shape.T) 
  piece.cells.forEach(pos => {
    grid[pos.y][pos.x] = piece.tetromino.shape;
  });

  return { grid: grid, piece: piece };
}

export function updatePiece(gameState: GameState, piece: Piece): void {
  gameState.piece.cells.forEach(pos => {
    gameState.grid[pos.y][pos.x] = null;
  });

  piece.cells.forEach(pos => {
    gameState.grid[pos.y][pos.x] = piece.tetromino.shape;
  });

  gameState.piece = piece;
}
