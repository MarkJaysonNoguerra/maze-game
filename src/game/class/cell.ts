import { Position } from "@/game/class";
import { GridData, Walls } from "@/game/type";
import { gridIndex } from "@/game/helper";

export class Cell {
  public visited = false;
  public walls: Walls = [true, true, true, true];

  constructor(
    private x: number,
    private y: number,
    private lastCell: Position
  ) {}

  get position(): Position {
    return new Position(this.x, this.y);
  }

  getNeighbors(grid: GridData): Cell[] {
    return [
      grid[this.getNeighborIndex(new Position(this.x, this.y - 1))],
      grid[this.getNeighborIndex(new Position(this.x + 1, this.y))],
      grid[this.getNeighborIndex(new Position(this.x, this.y + 1))],
      grid[this.getNeighborIndex(new Position(this.x - 1, this.y))],
    ].filter(Boolean);
  }

  checkNeighbors(grid: GridData): Cell | undefined {
    const neigbors = this.getNeighbors(grid).filter(({ visited }) => !visited);
    return neigbors.length > 0
      ? neigbors[Math.floor(Math.random() * neigbors.length)]
      : undefined;
  }

  private getNeighborIndex(position: Position): string {
    return this.isOutSideBoundary(position) ? "" : gridIndex(position);
  }

  private isOutSideBoundary(position: Position): boolean {
    const { x, y } = position;
    return x < 0 || y < 0 || x > this.lastCell.x || y > this.lastCell.y;
  }
}
