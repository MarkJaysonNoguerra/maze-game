import { Cell, MazeInfo, Position } from "@/game/class";
import { Direction } from "@/game/enum";
import { drawLine, drawRect, resetCanvas } from "@/game/helper";

export class Drawer {
  constructor(
    private ctx: CanvasRenderingContext2D,
    private mazeInfo: MazeInfo
  ) {}

  reset(): void {
    resetCanvas(this.ctx, this.mazeInfo);
  }

  drawMaze(grid: Cell[]): void {
    for (const cell of grid) {
      this.drawWalls(cell);
    }
  }

  drawBox(position: Position, color = "blue"): void {
    drawRect(this.ctx, position, this.mazeInfo.cell, color);
  }

  private drawWalls(cell: Cell): void {
    const { width, height } = this.mazeInfo.cell;
    const { walls, position: {x, y} } = cell;

    if (walls[Direction.Top]) {
      drawLine(
        this.ctx,
        new Position(this.startingX(x), this.startingY(y)),
        new Position(
          this.startingX(x) + width,
          this.startingY(y)
        )
      );
    }

    if (walls[Direction.Right]) {
      drawLine(
        this.ctx,
        new Position(
          this.startingX(x) + width,
          this.startingY(y) + height
        ),
        new Position(
          this.startingX(x) + width,
          this.startingY(y)
        )
      );
    }

    if (walls[Direction.Bottom]) {
      drawLine(
        this.ctx,
        new Position(
          this.startingX(x) + width,
          this.startingY(y) + height
        ),
        new Position(
          this.startingX(x),
          this.startingY(y) + height
        )
      );
    }

    if (walls[Direction.Left]) {
      drawLine(
        this.ctx,
        new Position(
          this.startingX(x),
          this.startingY(y) + height
        ),
        new Position(this.startingX(x), this.startingY(y))
      );
    }
  }

  private startingX(x: number): number {
    return x * this.mazeInfo.cell.width;
  }

  private startingY(y: number): number {
    return y * this.mazeInfo.cell.height;
  }
}
