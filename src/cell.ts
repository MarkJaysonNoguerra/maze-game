import { GridData } from './grid';
import { Walls } from './walls';

export class Cell {
  public visited = false;
  public walls: Walls = [true, true, true, true];

  constructor(
    private x: number,
    private y: number,
    private maxRow: number,
    private maxColumn: number,
  ) {}

  public get getX() {
    return this.x;
  }

  public get getY() {
    return this.y;
  }

  checkNeighbors(grid: GridData): Cell | undefined {
    let neigbors = [
      grid[this.getNeighborIndex(this.x, this.y - 1)],
      grid[this.getNeighborIndex(this.x + 1, this.y)],
      grid[this.getNeighborIndex(this.x, this.y + 1)],
      grid[this.getNeighborIndex(this.x - 1, this.y)],
    ];

    neigbors = neigbors.filter(Boolean).filter(({ visited }) => !visited);
    if (neigbors.length > 0) {
      return neigbors[Math.floor(Math.random() * neigbors.length)];
    }
    return undefined;
  }

  private getNeighborIndex(x: number, y: number) {
    if (x < 0 || y < 0 || x > this.maxColumn || y > this.maxRow) {
      return '';
    }
    return `${x}-${y}`;
  }
}
