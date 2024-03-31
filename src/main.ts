// assets
import "./assets/style.css";
import "normalize.css";

import { Game } from "./game/class/game";
import { MazeInfo } from "./game/class/maze-info";
import { Mode } from "./game/enum";

const HEIGHT = 400;
const WIDTH = 800;
const ROW = 15;
const COLUMN = 29;

window.onload = () => {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.height = HEIGHT;
  canvas.width = WIDTH;

  const mode = document.querySelector("#mode") as HTMLSelectElement;

  const game = new Game(
    ctx,
    new MazeInfo(ROW, COLUMN, WIDTH, HEIGHT),
    Mode.Solo
  );
  game.start();

  mode.addEventListener("change", (e: Event) => {
    const select = e.target as HTMLSelectElement;
    game.setMode(+select.value);
    game.stop();
    game.initialize();
    game.start();
  });
};
