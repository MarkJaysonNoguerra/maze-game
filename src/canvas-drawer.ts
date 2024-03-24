import { Cell } from './cell';
import { drawLine, drawRect } from './helper';
import { Wall } from './walls';

export class CanvasDrawer {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private boxWidth: number,
    private boxHeight: number,
  ) {}

  drawMaze(grid: Cell[]) {
    for (const cell of grid) {
      this.drawWalls(cell);
    }
  }

  drawGoal(x: number, y: number, weight: number, height: number){
    drawRect(this.ctx, [x, y], [weight, height]);
  }

  private drawWalls(cell: Cell) {
    if (cell.walls[Wall.Top]) {
      drawLine(
        this.ctx,
        [this.startingX(cell.getX), this.startingY(cell.getY)],
        [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY)],
      );
    }

    if (cell.walls[Wall.Right]) {
      drawLine(
        this.ctx,
        [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY) + this.boxHeight],
        [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY)],
      );
    }

    if (cell.walls[Wall.Bottom]) {
      drawLine(
        this.ctx,
        [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY) + this.boxHeight],
        [this.startingX(cell.getX), this.startingY(cell.getY) + this.boxHeight],
      );
    }

    if (cell.walls[Wall.Left]) {
      drawLine(
        this.ctx,
        [this.startingX(cell.getX), this.startingY(cell.getY) + this.boxHeight],
        [this.startingX(cell.getX), this.startingY(cell.getY)],
      );
    }
  }

  private startingX(x: number) {
    return x * this.boxWidth;
  }

  private startingY(y: number) {
    return y * this.boxHeight;
  }
}
