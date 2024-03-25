import {Cell} from "./cell.js";
import {Grid} from "./grid.js";
import {Player} from "./player.js";
import {Control} from "./control.js";
import {drawRect} from "./helper.js";
const HEIGHT = 400;
const WIDTH = 800;
const ROW = 15;
const COLUMN = 29;
const ROW_MIDDLE = Math.floor(ROW / 2);
const COLUMN_MIDDLE = Math.floor(COLUMN / 2);
const BOX_WIDTH = WIDTH / COLUMN;
const BOX_HEIGHT = HEIGHT / ROW;
const TOTAL_CELL = ROW * COLUMN;
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
let grid;
let player;
let control;
window.onload = async () => {
  gameSetup();
};
const gameSetup = () => {
  grid = new Grid(ctx, [COLUMN_MIDDLE, ROW_MIDDLE], BOX_WIDTH, BOX_HEIGHT);
  for (let index = 0; index < TOTAL_CELL; index++) {
    const x = index % COLUMN;
    const y = Math.floor(index / COLUMN);
    grid.addCell(`${x}-${y}`, new Cell(x, y, ROW - 1, COLUMN - 1));
  }
  player = new Player(0, 0);
  control = new Control(player, grid.gridData);
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  grid.generatePath(COLUMN - 1, ROW - 1).resetVisited().generatePath(0, 0).generateUnvisitedPath();
  animate();
};
const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  grid.draw();
  drawRect(ctx, [player.x * BOX_WIDTH, player.y * BOX_HEIGHT], [BOX_WIDTH, BOX_HEIGHT], "orange");
  if (player.x === COLUMN_MIDDLE && player.y === ROW_MIDDLE) {
    alert("You win");
    gameSetup();
    return;
  }
  requestAnimationFrame(animate);
};
