type PieceType = "normal";
type Pos = { x: number, y: number };
type Piece = { pieceType: PieceType; cells: Pos[]; };
type GameState = { grid: (PieceType | null)[][], piece: Piece };

export function init(): GameState {
  const rows = 16;
  const cols = 16;
  const grid = Array<Array<PieceType | null>>(rows);
  for (let i = 0; i < rows; i++) {
    grid[i] = Array<null>(cols).fill(null);
  }
  const piece = newPiece();
  piece.cells.forEach(pos => {
    grid[pos.y][pos.x] = piece.pieceType;
  });

  return { grid: grid, piece: piece };
}

function randomPieceType(): PieceType {
  return "normal";
}

function newPiece(): Piece {
  return { pieceType: randomPieceType(), cells: [] }
}
