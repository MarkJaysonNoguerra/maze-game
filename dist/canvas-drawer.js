import {drawLine, drawRect} from "./helper.js";
import {Wall} from "./walls.js";
export class CanvasDrawer {
  constructor(ctx, boxWidth, boxHeight) {
    this.ctx = ctx;
    this.boxWidth = boxWidth;
    this.boxHeight = boxHeight;
  }
  drawMaze(grid) {
    for (const cell of grid) {
      this.drawWalls(cell);
    }
  }
  drawGoal(x, y, weight, height, color = "blue") {
    drawRect(this.ctx, [x, y], [weight, height], color);
  }
  drawWalls(cell) {
    if (cell.walls[Wall.Top]) {
      drawLine(this.ctx, [this.startingX(cell.getX), this.startingY(cell.getY)], [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY)]);
    }
    if (cell.walls[Wall.Right]) {
      drawLine(this.ctx, [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY) + this.boxHeight], [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY)]);
    }
    if (cell.walls[Wall.Bottom]) {
      drawLine(this.ctx, [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY) + this.boxHeight], [this.startingX(cell.getX), this.startingY(cell.getY) + this.boxHeight]);
    }
    if (cell.walls[Wall.Left]) {
      drawLine(this.ctx, [this.startingX(cell.getX), this.startingY(cell.getY) + this.boxHeight], [this.startingX(cell.getX), this.startingY(cell.getY)]);
    }
  }
  startingX(x) {
    return x * this.boxWidth;
  }
  startingY(y) {
    return y * this.boxHeight;
  }
}
