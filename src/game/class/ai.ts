import { Cell, MazeInfo, MoveEvent, Position } from ".";
import { Direction, Participant } from "../enum";
import { delay, gridIndex, isEqualPosition } from "../helper";
import { Agent } from "../interface";
import { OnMoved } from "../moved-event";
import { GridData } from "../type";

export class Ai implements Agent {
  public myTurn = false;
  public previousPositionStack: Cell[] = [];
  public visitedCells: Cell[] = [];

  constructor(
    private x: number,
    private y: number,
    private grid: GridData,
    private mazeInfo: MazeInfo,
    private event: EventTarget
  ) {
    this.event.addEventListener(
      OnMoved,
      this.onMoved.bind(this) as (event: Event) => Promise<void>
    );
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

  getDirection(current: Cell, next: Cell): Direction | undefined {
    const { x: currentX, y: currentY } = current.position;
    const { x: nextX, y: nextY } = next.position;

    if (nextX > currentX) {
      return Direction.Right;
    }

    if (nextX < currentX) {
      return Direction.Left;
    }

    if (nextY > currentY) {
      return Direction.Bottom;
    }

    if (nextY < currentY) {
      return Direction.Top;
    }
  }

  async onMoved(e: CustomEvent) {
    if (this.myTurn && e.detail.participant === Participant.Player) {
      const current = this.grid[gridIndex(this.position)];
      await delay(100);

      const neigbors = current.getNeighbors(this.grid).filter((x) => {
        const direction = this.getDirection(current, x);
        if (direction === undefined) {
          return false;
        }
        return (
          !this.visitedCells.some((cell: Cell) =>
            isEqualPosition(x.position, cell.position)
          ) && !this.grid[gridIndex(current.position)].walls[direction]
        );
      });

      let next =
        neigbors.length > 0
          ? neigbors[Math.floor(Math.random() * neigbors.length)]
          : undefined;

      if (next) {
        const direction = this.getDirection(current, next);
        if (direction !== undefined) {
          this.move(direction);
        }
        this.visitedCells.push(next);
        this.previousPositionStack.push(current);
      } else {
        next = this.previousPositionStack.pop();
        if (next) {
          const direction = this.getDirection(current, next);
          if (direction !== undefined) {
            this.move(direction);
          }
        }
      }

      if (this.onGoalArea) {
        this.myTurn = false;
        return;
      }
      this.myTurn = true;
      this.event.dispatchEvent(
        new CustomEvent(OnMoved, {
          detail: new MoveEvent(Participant.Player, "AI moved"),
        })
      );
    }
  }

  reset(position: Position, grid: GridData): void {
    this.x = position.x;
    this.y = position.y;
    this.grid = grid;
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
