import { Tetromino, TetrominoT, Shape, Orientation } from "$lib/tetromino";

type GameState = { grid: (Shape | null)[][], tetromino: Tetromino };

export function init(): GameState {
  const rows = 16;
  const cols = 16;
  const grid = Array<Array<Shape | null>>(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = Array<null>(cols).fill(null);
  }
  const tetromino = new TetrominoT({ x: 4, y: 3 }, Orientation.RIGHT) 
  tetromino.cells.forEach(pos => {
    grid[pos.y][pos.x] = tetromino.shape;
  });

  return { grid: grid, tetromino: tetromino };
}
