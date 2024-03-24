import 'normalize.css';
import { Cell } from './cell';
import { Grid } from './grid';

const HEIGHT = 400;
const WIDTH = 800;
const ROW = 15;
const COLUMN = 29;

const ROW_MIDDLE = Math.floor(ROW / 2);
const COLUMN_MIDDLE = Math.floor(COLUMN / 2);
const BOX_WIDTH = WIDTH / COLUMN;
const BOX_HEIGHT = HEIGHT / ROW;
const TOTAL_CELL = ROW * COLUMN;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const grid = new Grid(ctx, [COLUMN_MIDDLE, ROW_MIDDLE], BOX_WIDTH, BOX_HEIGHT);

for (let index = 0; index < TOTAL_CELL; index++) {
  const x = index % COLUMN;
  const y = Math.floor(index / COLUMN);

  grid.addCell(`${x}-${y}`, new Cell(x, y, ROW - 1, COLUMN - 1));
}

window.onload = async () => {
  canvas.height = HEIGHT;
  canvas.width = WIDTH;

  grid
    .generatePath(COLUMN - 1, ROW - 1) // ai path
    .generatePath(0, 0) // player path
    .generateUnvisitedPath()
    .draw();
};
