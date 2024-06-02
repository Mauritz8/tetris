type Pos = { x: number, y: number };
export enum Orientation { UP, DOWN, RIGHT, LEFT };
export enum Shape { T };


export class Piece {
  pos: Pos;
  orientation: Orientation;
  tetromino: Tetromino;
  cells: Pos[];

  constructor(pos: Pos, orientation: Orientation, shape: Shape) {
    this.pos = pos;
    this.orientation = orientation;
    switch (shape) {
      case Shape.T:
        this.tetromino = TetrominoT;
    }

    switch (orientation) {
      case Orientation.UP:
        this.cells = this.tetromino.orientationUp(pos);
        break;
      case Orientation.DOWN:
        this.cells = this.tetromino.orientationDown(pos);
        break;
      case Orientation.RIGHT:
        this.cells = this.tetromino.orientationRight(pos);
        break;
      case Orientation.LEFT:
        this.cells = this.tetromino.orientationLeft(pos);
        break;
    }
  }
}

interface Tetromino {
  shape: Shape;
  orientationUp: (pos: Pos) => Pos[];
  orientationDown: (pos: Pos) => Pos[];
  orientationRight: (pos: Pos) => Pos[];
  orientationLeft: (pos: Pos) => Pos[];
}

const TetrominoT: Tetromino = {
  shape: Shape.T,

  orientationUp: (pos: Pos): Pos[] => {
    return [
      { x: pos.x, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x + 1, y: pos.y },
      { x: pos.x, y: pos.y - 1 }
    ];
  },

  orientationDown: (pos: Pos): Pos[] => {
    return [
      { x: pos.x, y: pos.y },
      { x: pos.x - 1, y: pos.y },
      { x: pos.x + 1, y: pos.y },
      { x: pos.x, y: pos.y + 1 }
    ];
  },

  orientationRight: (pos: Pos): Pos[] => {
    return [
      { x: pos.x, y: pos.y },
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x + 1, y: pos.y }
    ];
  },

  orientationLeft: (pos: Pos): Pos[] => {
    return [
      { x: pos.x, y: pos.y },
      { x: pos.x, y: pos.y - 1 },
      { x: pos.x, y: pos.y + 1 },
      { x: pos.x - 1, y: pos.y }
    ];
  }
};
