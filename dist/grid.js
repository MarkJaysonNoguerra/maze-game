import {CanvasDrawer} from "./canvas-drawer.js";
import {Wall} from "./walls.js";
export class Grid {
  constructor(ctx, goal, cellWidth, cellHeight) {
    this.ctx = ctx;
    this.goal = goal;
    this.cellWidth = cellWidth;
    this.cellHeight = cellHeight;
    this.gridData = {};
    this.visitedCellStack = [];
    this.drawer = new CanvasDrawer(this.ctx, this.cellWidth, this.cellHeight);
  }
  get getGridData() {
    return Object.values(this.gridData);
  }
  isGoalCell(x, y) {
    const [goalX, goalY] = this.goal;
    return goalX === x && goalY === y;
  }
  addCell(key, value) {
    this.gridData[key] = value;
  }
  draw() {
    const [x, y] = this.goal;
    this.drawer.drawGoal(x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
    this.drawer.drawMaze(this.getGridData);
  }
  resetVisited() {
    for (const item of this.getGridData) {
      item.visited = false;
    }
    return this;
  }
  generatePath(startX, startY) {
    let current = this.gridData[`${startX}-${startY}`];
    while (current && !this.isGoalCell(current.getX, current.getY)) {
      current.visited = true;
      const next = current.checkNeighbors(this.gridData);
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
    let current = Object.values(this.gridData).filter(({visited}) => !visited)[0];
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
          current = Object.values(this.gridData).filter(({visited}) => !visited)[0];
        }
      }
    }
    return this;
  }
  removeWalls(current, next) {
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
