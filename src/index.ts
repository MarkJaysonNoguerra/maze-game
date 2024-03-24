import 'normalize.css';
import { Cell } from './cell';
import { Grid } from './grid';
import { Wall } from './walls';

const HEIGHT = 400;
const WIDTH = 800;
const ROW = 11;
const COLUMN = 23;
const ROW_MIDDLE = Math.floor(ROW / 2);
const COLUMN_MIDDLE = Math.floor(COLUMN / 2);

const BOX_WIDTH = WIDTH / COLUMN;
const BOX_HEIGHT = HEIGHT / ROW;
const TOTAL_CELL = ROW * COLUMN;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const visitedCellStack: Cell[] = [];

window.onload = async () => {
  canvas.height = HEIGHT;
  canvas.width = WIDTH;
  const grid: Grid = {};

  for (let index = 0; index < TOTAL_CELL; index++) {
    const x = index % COLUMN;
    const y = Math.floor(index / COLUMN);

    const cell = new Cell(x, y, BOX_WIDTH, BOX_HEIGHT, ROW - 1, COLUMN - 1);
    grid[`${x}-${y}`] = cell;
  }

  let current: Cell | undefined = grid['0-0'];
  while (
    current &&
    (current.getX !== COLUMN_MIDDLE || current.getY !== ROW_MIDDLE)
  ) {
    current.visited = true;
    const next: Cell | undefined = current.checkNeighbors(grid);
    if (next) {
      removeWall(current, next);
      visitedCellStack.push(next);
      current = next;
    } else {
      current = visitedCellStack.pop();
    }
  }

  current = grid[`${COLUMN - 1}-${ROW_MIDDLE - 1}`];
  while (
    current &&
    (current.getX !== COLUMN_MIDDLE || current.getY !== ROW_MIDDLE)
  ) {
    current.visited = true;
    const next = current.checkNeighbors(grid);
    if (next) {
      removeWall(current, next);
      visitedCellStack.push(next);
      current = next;
    } else {
      current = visitedCellStack.pop();
    }
  }

  current = Object.values(grid).filter(({ visited }) => !visited)[0];
  while (current) {
    current.visited = true;
    const next = current.checkNeighbors(grid);
    if (next) {
      removeWall(current, next);
      visitedCellStack.push(next);
      current = next;
    } else {
      current = visitedCellStack.pop();
      if (!current) {
        current = Object.values(grid).filter(({ visited }) => !visited)[0];
      }
    }
  }

  for (const cell of Object.values(grid)) {
      cell.draw(ctx);
  }
  grid[`${COLUMN_MIDDLE}-${ROW_MIDDLE}`].drawActive(ctx, 'blue');
  console.log('done');
};

const removeWall = (current: Cell, next: Cell) => {
  if (next.getX !== current.getX) {
    if (next.getX > current.getX) {
      current.walls[Wall.Right] = false;
      next.walls[Wall.Left] = false;
    } else {
      current.walls[Wall.Left] = false;
      next.walls[Wall.Right] = false;
    }
  } else {
    if (next.getY > current.getY) {
      current.walls[Wall.Bottom] = false;
      next.walls[Wall.Top] = false;
    } else {
      current.walls[Wall.Top] = false;
      next.walls[Wall.Bottom] = false;
    }
  }
};

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));
