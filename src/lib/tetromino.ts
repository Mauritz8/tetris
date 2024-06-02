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
        this.orientation = Orientation.RIGHT;
        this.cells = this.orientationRight(); 
        break;
      case Orientation.RIGHT:
        this.orientation = Orientation.DOWN;
        this.cells = this.orientationDown(); 
        break;
      case Orientation.DOWN:
        this.orientation = Orientation.LEFT;
        this.cells = this.orientationLeft(); 
        break;
      case Orientation.LEFT:
        this.orientation = Orientation.UP;
        this.cells = this.orientationUp(); 
        break;
    }
  }

  moveBy(x: number, y: number): void {
    this.pos = { x: this.pos.x + x, y: this.pos.y + y };
    this.cells = this.cells.map(pos => {
      return { x: pos.x + x, y: pos.y + y };
    });
  }

  moveRight = () => this.moveBy(1, 0);
  moveLeft = () => this.moveBy(-1, 0);
  moveDown = () => this.moveBy(0, +1);
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
