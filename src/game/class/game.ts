import {
  Ai,
  Drawer,
  Grid,
  MazeInfo,
  Player,
  Position,
} from "@/game/class";
import { Mode, Participant } from "../enum";
import { OnMoved } from "../moved-event";

export class Game {
  private grid: Grid;
  private player: Player;
  private ai: Ai;
  private drawer: Drawer;
  private requestAnimation = 0;
  private agentsEvent = new EventTarget();

  constructor(
    private ctx: CanvasRenderingContext2D,
    private mazeInfo: MazeInfo,
    private mode: Mode
  ) {
    this.agentsEvent.addEventListener(
      OnMoved,
      this.onAgentsMove.bind(this) as EventListener
    );

    this.grid = new Grid(this.mazeInfo);
    this.grid.generate();
    this.drawer = new Drawer(this.ctx, this.mazeInfo);

    this.player = new Player(
      0,
      0,
      this.grid.gridData,
      this.mazeInfo,
      this.agentsEvent
    );
    this.player.myTurn = true;

    this.ai = new Ai(
      this.mazeInfo.column - 1,
      this.mazeInfo.row - 1,
      this.grid.gridData,
      this.mazeInfo,
      this.agentsEvent
    );
  }

  onAgentsMove(e: CustomEvent): void {
    if (this.mode === Mode.Solo) {
      this.player.myTurn = true;
      return;
    }

    if (e.detail.participant === Participant.Player) {
      this.ai.myTurn = true;
      return;
    }
    this.player.myTurn = true;
  }

  setMode(mode: Mode) {
    this.mode = mode;
  }

  soloMode(): void {
    this.grid
      .generatePath(new Position(0, 0)) // player path
      .randomWalk();

    this.player.reset(new Position(0, 0), this.grid.gridData);
    this.player.myTurn = true;

    this.ai.reset(
      new Position(this.mazeInfo.column - 1, this.mazeInfo.row - 1),
      this.grid.gridData
    );

    this.animate();
  }

  vsAiMode(): void {
    this.grid
      .generatePath(
        new Position(this.mazeInfo.column - 1, this.mazeInfo.row - 1)
      ) // ai path
      .generatePath(new Position(0, 0)) // player path
      .randomWalk();
    this.player.reset(new Position(0, 0), this.grid.gridData);
    this.player.myTurn = true;

    this.ai.visitedCells = [];
    this.ai.previousPositionStack = [];
    this.ai.reset(
      new Position(this.mazeInfo.column - 1, this.mazeInfo.row - 1), this.grid.gridData
    );

    this.animate();
  }

  start() {
    this.mode === Mode.Solo ? this.soloMode() : this.vsAiMode();
  }

  initialize(): void {
    this.grid.generate();
  }

  stop(cancel = true): void {
    this.grid.reset();
    if (cancel) {
      cancelAnimationFrame(this.requestAnimation);
    }
  }

  animate(): void {
    this.drawer.reset();
    // goal area
    this.drawer.drawBox(this.mazeInfo.goalCoordinate);
    this.drawer.drawMaze(this.grid.cells);

    // player position
    this.drawer.drawBox(this.player.coordinate, "orange");

    // ai position
    if (this.mode === Mode.VsAi) {
      this.drawer.drawBox(this.ai.coordinate, "purple");
    }

    if (this.player.onGoalArea) {
      cancelAnimationFrame(this.requestAnimation);

      setTimeout(() => {
        alert("You Win!!!");
        this.stop(false);
        this.initialize();
        this.start();
      }, 0);

      return;
    }

    if (this.ai.onGoalArea) {
      cancelAnimationFrame(this.requestAnimation);

      setTimeout(() => {
        alert("You lose!!!");
        this.stop(false);
        this.initialize();
        this.start();
      }, 0);

      return;
    }

    this.requestAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}
