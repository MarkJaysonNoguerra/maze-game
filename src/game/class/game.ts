import { Drawer, Grid, MazeInfo, Player, Position } from "@/game/class";

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

    this.player = new Player(0, 0, this.grid.gridData, this.mazeInfo);
    this.drawer = new Drawer(this.ctx, this.mazeInfo);
  }

  initialize(): void {
    this.grid
      .findPath(new Position(this.mazeInfo.column - 1, this.mazeInfo.row - 1)) // ai path
      .resetVisited()
      .findPath(new Position(0, 0)) // player path
      .fillUnvisitedPath();

    this.animate();
  }

  restart(): void {
    this.grid.reset();
    this.grid.generate();
    this.player = new Player(0, 0, this.grid.gridData, this.mazeInfo);
    this.initialize();
  }

  animate(): void {
    this.drawer.reset();
    this.drawer.drawBox(this.mazeInfo.goalCoordinate);
    this.drawer.drawMaze(this.grid.cells);
    // player position
    this.drawer.drawBox(this.player.coordinate, "orange");

    if (this.player.onGoalArea) {
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
