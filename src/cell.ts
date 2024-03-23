import { Grid } from './grid';
import { Wall, Walls } from './walls';

export class Cell {
  public visited = false;
  public walls: Walls = [true, true, true, true];

  constructor(
    private x: number,
    private y: number,
    private width: number,
    private height: number,
    private maxRow: number,
    private maxColumn: number,
  ) {}

  checkNeighbors(grid: Grid): Cell | undefined {
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

  drawActive(ctx: CanvasRenderingContext2D, color = 'orange') {
    this.drawRect(
      ctx,
      [this.startX, this.startY],
      [this.width, this.height],
      color,
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    // this.drawRect(
    //     ctx,
    //     [this.startX, this.startY],
    //     [this.width, this.height],
    //     'blue',
    //   );
    // console.log(
    //     this.walls[Wall.Top],
    //     this.walls[Wall.Right],
    //     this.walls[Wall.Bottom],
    //     this.walls[Wall.Left]
    // );

    if (this.walls[Wall.Top]) {
      this.drawLine(
        ctx,
        [this.startX, this.startY],
        [this.startX + this.width, this.startY],
      );
    }

    if (this.walls[Wall.Right]) {
      this.drawLine(
        ctx,
        [this.startX + this.width, this.startY],
        [this.startX + this.width, this.startY + this.height],
      );
    }

    if (this.walls[Wall.Bottom]) {
      this.drawLine(
        ctx,
        [this.startX + this.width, this.startY + this.height],
        [this.startX, this.startY + this.height],
      );
    }

    if (this.walls[Wall.Left]) {
      this.drawLine(
        ctx,
        [this.startX, this.startY + this.height],
        [this.startX, this.startY],
      );
    }
  }

  drawRect(
    ctx: CanvasRenderingContext2D,
    startPoint: [number, number],
    widthHeight: [number, number],
    filleStyle = 'blue',
  ) {
    ctx.rect(...startPoint, ...widthHeight);
    ctx.fillStyle = filleStyle;
    ctx.fill();
  }

  public get getX() {
    return this.x;
  }

  public get getY() {
    return this.y;
  }

  private get startX() {
    return this.x * this.width;
  }

  private get startY() {
    return this.y * this.height;
  }

  private drawLine(
    ctx: CanvasRenderingContext2D,
    startPoint: [number, number],
    endpoint: [number, number],
  ) {
    ctx.beginPath();
    ctx.moveTo(...startPoint);
    ctx.lineTo(...endpoint);
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();
  }
}
