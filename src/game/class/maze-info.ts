import { Dimension } from "../type/dimension";
import { Position } from "../type/position";

export class MazeInfo {
  constructor(
    readonly row: number,
    readonly column: number,
    readonly width: number,
    readonly height: number
  ) {}

  get cell(): Dimension {
    return {
      width: this.width / this.column,
      height: this.height / this.row,
    };
  }

  get canvas(): Dimension {
    return {
      width: this.width,
      height: this.height,
    };
  }

  get goal(): Position {
    return {
      x: Math.round(this.column / 2),
      y: Math.round(this.row / 2),
    };
  }

  get cellCount() {
    return this.row * this.column;
  }

  get lastCell(): Position {
    return {
      x: this.column - 1,
      y: this.row - 1,
    };
  }
}
