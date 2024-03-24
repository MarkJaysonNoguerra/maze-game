import { CanvasDrawer } from './canvas-drawer';
import { Cell } from './cell';
import { Wall } from './walls';

export type GridData = Record<string, Cell>;

export class Grid {
  private gridData: GridData = {};
  private visitedCellStack: Cell[] = [];
  private drawer: CanvasDrawer;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private goal: [number, number],
    private cellWidth: number,
    private cellHeight: number,
  ) {
    this.drawer = new CanvasDrawer(this.ctx, this.cellWidth, this.cellHeight);
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
        current.walls[Wall.Right] = false;
        next.walls[Wall.Left] = false;
      } else {
        current.walls[Wall.Left] = false;
        next.walls[Wall.Right] = false;
      }
    } else {
      if (next.getY > current.getY) {
        current.walls[Wall.Bottom] = false;
        next.walls[Wall.Top] = false;
      } else {
        current.walls[Wall.Top] = false;
        next.walls[Wall.Bottom] = false;
      }
    }
  }
}
