import { Direction } from "../enum";
import { GridData, Position } from "../type";

const arrowKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

export class Player {
  constructor(private x: number, private y: number, private _grid: GridData) {
    window.addEventListener("keydown", ({ code, key }: KeyboardEvent) => {
      const direction: Direction = arrowKeys.indexOf(code);

      if (arrowKeys.includes(key) && this.validMove(direction)) {
        this.move(direction);
      }
    });
  }

  get position(): Position {
    return {
      x: this.x,
      y: this.y,
    };
  }

  getPlayerPosition() {
    return this._grid[`${this.x}-${this.y}`];
  }

  validMove(direction: Direction) {
    return !this.getPlayerPosition().walls[direction];
  }

  move(direction: Direction) {
    switch (direction) {
      case Direction.Top:
        this.y -= 1;
        break;
      case Direction.Right:
        this.x += 1;
        break;
      case Direction.Bottom:
        this.y += 1;
        break;
      case Direction.Left:
        this.x -= 1;
        break;
    }
  }
}
