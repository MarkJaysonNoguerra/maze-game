import { Dimension, Position } from "@/game/class";

export class MazeInfo {
  constructor(
    readonly row: number,
    readonly column: number,
    readonly width: number,
    readonly height: number
  ) {}

  get cell(): Dimension {
    return new Dimension(this.width / this.column, this.height / this.row);
  }

  get goal(): Position {
    return new Position(Math.round(this.column / 2), Math.round(this.row / 2));
  }

  get goalCoordinate(): Position {
    return new Position(
      this.goal.x * this.cell.width,
      this.goal.y * this.cell.height
    );
  }

  get cellCount(): number {
    return this.row * this.column;
  }

  get lastCell(): Position {
    return new Position(this.column - 1, this.row - 1);
  }
}
