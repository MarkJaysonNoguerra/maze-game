import { Cell, MazeInfo, Position } from "@/game/class";
import { Direction } from "@/game/enum";
import { gridIndex } from "@/game/helper";
import { GridData } from "@/game/type";

const arrowKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

export class Player {
  constructor(
    private x: number,
    private y: number,
    private grid: GridData,
    private mazeInfo: MazeInfo
  ) {
    window.addEventListener("keydown", ({ code, key }: KeyboardEvent) => {
      const direction: Direction = arrowKeys.indexOf(code);

      if (arrowKeys.includes(key) && this.validMove(direction)) {
        this.move(direction);
      }
    });
  }

  get coordinate(): Position {
    return new Position(
      this.x * this.mazeInfo.cell.width,
      this.y * this.mazeInfo.cell.height
    );
  }

  get onGoalArea(): boolean {
    const { x, y } = this.mazeInfo.goal;
    return this.x === x && this.y === y;
  }

  getPlayerPosition(): Cell {
    return this.grid[gridIndex(new Position(this.x, this.y))];
  }

  validMove(direction: Direction): boolean {
    return !this.getPlayerPosition().walls[direction];
  }

  move(direction: Direction): void {
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
