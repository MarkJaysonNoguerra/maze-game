import { Cell } from '.';
import { Direction } from '../enum';
import { drawLine, drawRect } from '../helper';

export class Drawer {
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

  drawGoal(x: number, y: number, weight: number, height: number, color = 'blue'){
    drawRect(this.ctx, [x, y], [weight, height], color);
  }

  private drawWalls(cell: Cell) {
    if (cell.walls[Direction.Top]) {
      drawLine(
        this.ctx,
        [this.startingX(cell.getX), this.startingY(cell.getY)],
        [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY)],
      );
    }

    if (cell.walls[Direction.Right]) {
      drawLine(
        this.ctx,
        [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY) + this.boxHeight],
        [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY)],
      );
    }

    if (cell.walls[Direction.Bottom]) {
      drawLine(
        this.ctx,
        [this.startingX(cell.getX) + this.boxWidth, this.startingY(cell.getY) + this.boxHeight],
        [this.startingX(cell.getX), this.startingY(cell.getY) + this.boxHeight],
      );
    }

    if (cell.walls[Direction.Left]) {
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
