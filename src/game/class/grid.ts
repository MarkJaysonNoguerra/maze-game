import { Cell, Drawer } from ".";
import { Direction } from "../enum";
import { GridData } from "../type";
import { MazeInfo } from "./maze-info";

export class Grid {
  public gridData: GridData = {};
  private visitedCellStack: Cell[] = [];

  constructor(private mazeInfo: MazeInfo) {}

  get cells() {
    return Object.values(this.gridData);
  }

  reset() {
    this.gridData = {};
  }

  generate() {
    for (let index = 0; index < this.mazeInfo.cellCount; index++) {
      const x = index % this.mazeInfo.column;
      const y = Math.floor(index / this.mazeInfo.column);
      
      this.gridData[`${x}-${y}`] = new Cell(x, y, this.mazeInfo.lastCell);
    }
  }

  resetVisited() {
    for (const item of this.cells) {
      item.visited = false;
    }
    return this;
  }

  findPath(startX: number, startY: number) {
    let current: Cell | undefined = this.gridData[`${startX}-${startY}`];

    while (current && !this.isGoalCell(current.getX, current.getY)) {
      current.visited = true;
      const next: Cell | undefined = current.checkNeighbors(this.gridData);
      if (next) {
        this.removeWalls(current, next);
        this.visitedCellStack.push(next);
        current = next;
      } else {
        current = this.visitedCellStack.pop();
      }
    }
    return this;
  }

  fillUnvisitedPath() {
    let current: Cell | undefined = Object.values(this.gridData).filter(
      ({ visited }) => !visited
    )[0];

    while (current) {
      current.visited = true;
      const next = current.checkNeighbors(this.gridData);
      if (next) {
        this.removeWalls(current, next);
        this.visitedCellStack.push(next);
        current = next;
      } else {
        current = this.visitedCellStack.pop();
        if (!current) {
          current = Object.values(this.gridData).filter(
            ({ visited }) => !visited
          )[0];
        }
      }
    }
    return this;
  }

  removeWalls(current: Cell, next: Cell) {
    if (next.getX !== current.getX) {
      if (next.getX > current.getX) {
        current.walls[Direction.Right] = false;
        next.walls[Direction.Left] = false;
      } else {
        current.walls[Direction.Left] = false;
        next.walls[Direction.Right] = false;
      }
    } else {
      if (next.getY > current.getY) {
        current.walls[Direction.Bottom] = false;
        next.walls[Direction.Top] = false;
      } else {
        current.walls[Direction.Top] = false;
        next.walls[Direction.Bottom] = false;
      }
    }
  }

  private isGoalCell(x: number, y: number) {
    const { x: goalX, y: goalY } = this.mazeInfo.goal;
    return goalX === x && goalY === y;
  }
}
