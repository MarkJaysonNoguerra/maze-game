import { Cell, Drawer } from ".";
import { Direction } from "../enum";
import { GridData } from "../type";

export class Grid {
  public gridData: GridData = {};
  private visitedCellStack: Cell[] = [];
  private drawer: Drawer;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private goal: [number, number],
    private cellWidth: number,
    private cellHeight: number,
  ) {
    this.drawer = new Drawer(this.ctx, this.cellWidth, this.cellHeight);
  }

  get getGridData() {
    return Object.values(this.gridData);
  }

  private isGoalCell(x: number, y: number) {
    const [goalX, goalY] = this.goal;
    return goalX === x && goalY === y;
  }

  addCell(key: string, value: Cell) {
    this.gridData[key] = value;
  }

  draw() {
    const [x, y] = this.goal;
    this.drawer.drawGoal(
      x * this.cellWidth,
      y * this.cellHeight,
      this.cellWidth,
      this.cellHeight,
    );
    this.drawer.drawMaze(this.getGridData);
  }

  resetVisited() {
    for(const item of this.getGridData) {
      item.visited = false;
    }
    return this;
  }

  generatePath(startX: number, startY: number) {
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

  generateUnvisitedPath() {
    let current: Cell | undefined = Object.values(this.gridData).filter(
      ({ visited }) => !visited,
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
            ({ visited }) => !visited,
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
}
