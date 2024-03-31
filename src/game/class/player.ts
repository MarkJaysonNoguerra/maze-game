import { Cell, MazeInfo, Position, MoveEvent } from "@/game/class";
import { Direction, Participant } from "@/game/enum";
import { gridIndex, isEqualPosition } from "@/game/helper";
import { GridData } from "@/game/type";
import { Agent } from "../interface";
import { OnMoved } from "../moved-event";

const arrowKeys = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];

export class Player implements Agent {
  public myTurn = false;

  constructor(
    private x: number,
    private y: number,
    private grid: GridData,
    private mazeInfo: MazeInfo,
    private event: EventTarget
  ) {
    window.addEventListener("keydown", ({ code, key }: KeyboardEvent) => {
      const direction: Direction = arrowKeys.indexOf(code);

      if (this.myTurn && arrowKeys.includes(key) && this.validMove(direction)) {

        this.move(direction);
        this.myTurn = false;
        this.event.dispatchEvent(
          new CustomEvent(OnMoved, {
            detail: new MoveEvent(Participant.Player, "player moved"),
          })
        );
      }
    });
  }

  get position(): Position {
    return new Position(this.x, this.y);
  }

  get coordinate(): Position {
    return new Position(
      this.x * this.mazeInfo.cell.width,
      this.y * this.mazeInfo.cell.height
    );
  }

  get onGoalArea(): boolean {
    return isEqualPosition(this.mazeInfo.goal, this.position);
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

  reset(position: Position, grid: GridData): void {
    this.x = position.x;
    this.y = position.y;
    this.grid = grid;
  }

  private validMove(direction: Direction): boolean {
    return !this.getPlayerPosition().walls[direction];
  }

  private getPlayerPosition(): Cell {
    return this.grid[gridIndex(this.position)];
  }
}
