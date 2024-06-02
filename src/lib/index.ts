import { Piece, Shape, Orientation } from "$lib/tetromino";

type GameState = { grid: (Shape | null)[][], piece: Piece };

export function init(): GameState {
  const rows = 16;
  const cols = 16;
  const grid = Array<Array<Shape | null>>(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = Array<null>(cols).fill(null);
  }
  const piece = new Piece({ x: 4, y: 3 }, Orientation.RIGHT, Shape.T) 
  piece.cells.forEach(pos => {
    grid[pos.y][pos.x] = piece.tetromino.shape;
  });

  return { grid: grid, piece: piece };
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


export function updatePiece(gameState: GameState, piece: Piece): void {
  gameState.piece.cells.forEach(pos => {
    gameState.grid[pos.y][pos.x] = null;
  });

  piece.cells.forEach(pos => {
    gameState.grid[pos.y][pos.x] = piece.tetromino.shape;
  });

  gameState.piece = piece;
}
