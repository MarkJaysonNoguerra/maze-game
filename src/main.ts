// assets
import "./assets/style.css";
import "normalize.css";

import { Game } from "./game/class/game";
import { MazeInfo } from "./game/class/maze-info";

const HEIGHT = 400;
const WIDTH = 800;
const ROW = 15;
const COLUMN = 29;

window.onload = () => {
  const canvas = document.querySelector("#canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  canvas.height = HEIGHT;
  canvas.width = WIDTH;

  new Game(ctx, new MazeInfo(ROW, COLUMN, WIDTH, HEIGHT)).initialize();
};
