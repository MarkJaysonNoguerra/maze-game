import { Drawer, Grid, Player } from ".";
import { MazeInfo } from "./maze-info";

export class Game {
  private grid: Grid;
  private player: Player;
  private drawer: Drawer;
  private requestAnimation = 0;

  constructor(
    private ctx: CanvasRenderingContext2D,
    private mazeInfo: MazeInfo
  ) {
    this.grid = new Grid(this.mazeInfo);
    this.grid.generate();
    this.player = new Player(0, 0, this.grid.gridData);
    this.drawer = new Drawer(this.ctx, this.mazeInfo.cell);
  }

  initialize() {
    this.grid
      .findPath(this.mazeInfo.column - 1, this.mazeInfo.row - 1) // ai path
      .resetVisited()
      .findPath(0, 0) // player path
      .fillUnvisitedPath();

    this.animate();
  }

  restart() {
    this.grid.reset();
    this.grid.generate();
    this.player = new Player(0, 0, this.grid.gridData);
    this.initialize();
  }

  animate() {
    this.ctx.clearRect(0, 0, this.mazeInfo.width, this.mazeInfo.height);
    this.drawer.drawBox(
      {
        x: this.mazeInfo.goal.x * this.mazeInfo.cell.width,
        y: this.mazeInfo.goal.y * this.mazeInfo.cell.height,
      },
      this.mazeInfo.cell
    );

    this.drawer.drawMaze(this.grid.cells);

    // player position
    this.drawer.drawBox(
      {
        x: this.player.position.x * this.mazeInfo.cell.width,
        y: this.player.position.y * this.mazeInfo.cell.height,
      },
      this.mazeInfo.cell,
      "orange"
    );

    if (
      this.player.position.x === this.mazeInfo.goal.x &&
      this.player.position.y === this.mazeInfo.goal.y
    ) {
      cancelAnimationFrame(this.requestAnimation);

      setTimeout(() => {
        alert("You Win!!!");
        this.restart();
      }, 0);
      return;
    }
    this.requestAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}
