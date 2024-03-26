import { Cell, Control, Grid, Player } from ".";
import { drawRect } from "../helper";

export class Game {
  readonly HEIGHT = 400;
  readonly WIDTH = 800;
  readonly ROW = 15;
  readonly COLUMN = 29;

  readonly ROW_MIDDLE = Math.floor(this.ROW / 2);
  readonly COLUMN_MIDDLE = Math.floor(this.COLUMN / 2);
  readonly BOX_WIDTH = this.WIDTH / this.COLUMN;
  readonly BOX_HEIGHT = this.HEIGHT / this.ROW;
  readonly TOTAL_CELL = this.ROW * this.COLUMN;

  private grid: Grid;
  private player: Player;
  private ctx: CanvasRenderingContext2D;
  private requestAnimation = 0;

  constructor(canvas: HTMLCanvasElement) {
    canvas.height = this.HEIGHT;
    canvas.width = this.WIDTH;

    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    this.grid = new Grid(
      this.ctx,
      [this.COLUMN_MIDDLE, this.ROW_MIDDLE],
      this.BOX_WIDTH,
      this.BOX_HEIGHT
    );

    this.setUpGrid();

    this.player = new Player(0, 0);
    new Control(this.player, this.grid.gridData);
  }

  start() {
    this.grid
      .generatePath(this.COLUMN - 1, this.ROW - 1) // ai path
      .resetVisited()
      .generatePath(0, 0) // player path
      .generateUnvisitedPath();

    this.animate();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    this.grid.draw();

    drawRect(
      this.ctx,
      [this.player.x * this.BOX_WIDTH, this.player.y * this.BOX_HEIGHT],
      [this.BOX_WIDTH, this.BOX_HEIGHT],
      "orange"
    );

    if (
      this.player.x === this.COLUMN_MIDDLE &&
      this.player.y === this.ROW_MIDDLE
    ) {
      cancelAnimationFrame(this.requestAnimation);
      setTimeout(() => {
        alert("winner");

        this.grid = new Grid(
          this.ctx,
          [this.COLUMN_MIDDLE, this.ROW_MIDDLE],
          this.BOX_WIDTH,
          this.BOX_HEIGHT
        );
        this.setUpGrid();
        this.player = new Player(0, 0);
        new Control(this.player, this.grid.gridData);
        this.start();
      }, 0);
      return;
    }
    this.requestAnimation = requestAnimationFrame(this.animate.bind(this));
  }

  setUpGrid() {
    for (let index = 0; index < this.TOTAL_CELL; index++) {
      const x = index % this.COLUMN;
      const y = Math.floor(index / this.COLUMN);

      this.grid.addCell(
        `${x}-${y}`,
        new Cell(x, y, this.ROW - 1, this.COLUMN - 1)
      );
    }
  }
}
