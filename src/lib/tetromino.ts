type Pos = { x: number, y: number };
export enum Orientation { UP, DOWN, RIGHT, LEFT };
export enum Shape { T };


export abstract class Tetromino {
  pos: Pos;
  orientation: Orientation;
  cells: Pos[];
  abstract shape: Shape;

  abstract orientationUp(): Pos[];
  abstract orientationDown(): Pos[];
  abstract orientationRight(): Pos[];
  abstract orientationLeft(): Pos[];

  constructor(pos: Pos, orientation: Orientation) {
    this.pos = pos;
    this.orientation = orientation;
    switch (orientation) {
      case Orientation.UP:
        this.cells = this.orientationUp();
        break;
      case Orientation.DOWN:
        this.cells = this.orientationDown();
        break;
      case Orientation.RIGHT:
        this.cells = this.orientationRight();
        break;
      case Orientation.LEFT:
        this.cells = this.orientationLeft();
        break;
    }
  }

  rotate(): void {
    switch (this.orientation) {
      case Orientation.UP:
        this.cells = this.orientationRight(); 
        break;
      case Orientation.RIGHT:
        this.cells = this.orientationDown(); 
        break;
      case Orientation.DOWN:
        this.cells = this.orientationLeft(); 
        break;
      case Orientation.LEFT:
        this.cells = this.orientationUp(); 
        break;
    }
  }
}

export class TetrominoT extends Tetromino {
  shape = Shape.T

  orientationUp(): Pos[] {
    return [
      { x: this.pos.x, y: this.pos.y },
      { x: this.pos.x - 1, y: this.pos.y },
      { x: this.pos.x + 1, y: this.pos.y },
      { x: this.pos.x, y: this.pos.y - 1 }
    ];
  }

  orientationDown(): Pos[] {
    return [
      { x: this.pos.x, y: this.pos.y },
      { x: this.pos.x - 1, y: this.pos.y },
      { x: this.pos.x + 1, y: this.pos.y },
      { x: this.pos.x, y: this.pos.y + 1 }
    ];
  }

  orientationRight(): Pos[] {
    return [
      { x: this.pos.x, y: this.pos.y },
      { x: this.pos.x, y: this.pos.y - 1 },
      { x: this.pos.x, y: this.pos.y + 1 },
      { x: this.pos.x + 1, y: this.pos.y }
    ];
  }

  orientationLeft(): Pos[] {
    return [
      { x: this.pos.x, y: this.pos.y },
      { x: this.pos.x, y: this.pos.y - 1 },
      { x: this.pos.x, y: this.pos.y + 1 },
      { x: this.pos.x - 1, y: this.pos.y }
    ];
  }
}
