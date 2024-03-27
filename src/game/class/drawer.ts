import { Cell } from ".";
import { Direction } from "../enum";
import { drawLine, drawRect } from "../helper";
import { Dimension } from "../type/dimension";
import { Position } from "../type/position";

export class Drawer {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private cellDimension: Dimension
  ) {}

  drawMaze(grid: Cell[]) {
    for (const cell of grid) {
      this.drawWalls(cell);
    }
  }

  drawBox(position: Position, dimension: Dimension, color = "blue") {
    drawRect(this.ctx, position, dimension, color);
  }

  private drawWalls(cell: Cell) {
    if (cell.walls[Direction.Top]) {
      drawLine(
        this.ctx,
        [this.startingX(cell.getX), this.startingY(cell.getY)],
        [
          this.startingX(cell.getX) + this.cellDimension.width,
          this.startingY(cell.getY),
        ]
      );
    }

    if (cell.walls[Direction.Right]) {
      drawLine(
        this.ctx,
        [
          this.startingX(cell.getX) + this.cellDimension.width,
          this.startingY(cell.getY) + this.cellDimension.height,
        ],
        [
          this.startingX(cell.getX) + this.cellDimension.width,
          this.startingY(cell.getY),
        ]
      );
    }

    if (cell.walls[Direction.Bottom]) {
      drawLine(
        this.ctx,
        [
          this.startingX(cell.getX) + this.cellDimension.width,
          this.startingY(cell.getY) + this.cellDimension.height,
        ],
        [
          this.startingX(cell.getX),
          this.startingY(cell.getY) + this.cellDimension.height,
        ]
      );
    }

    if (cell.walls[Direction.Left]) {
      drawLine(
        this.ctx,
        [
          this.startingX(cell.getX),
          this.startingY(cell.getY) + this.cellDimension.height,
        ],
        [this.startingX(cell.getX), this.startingY(cell.getY)]
      );
    }
  }

  private startingX(x: number) {
    return x * this.cellDimension.width;
  }

  private startingY(y: number) {
    return y * this.cellDimension.height;
  }
}
