import 'normalize.css';
import { Cell } from './cell';
import { Grid } from './grid';
import { Wall } from './walls';

const HEIGHT = 400;
const WIDTH = 800;
const ROW = 5;
const COLUMN = 11;
const BOX_WIDTH = WIDTH / COLUMN;
const BOX_HEIGHT = HEIGHT / ROW;
const TOTAL_CELL = ROW * COLUMN;

const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
const visitedCellStack:Cell[] = [];

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
  while (current && (current.getX !== 5 || current.getY !== 2)) {
    current.visited = true;
    current.drawActive(ctx);
    await delay(500);
    current.draw(ctx);
    const next = current.checkNeighbors(grid);
    if (next) {
      // removeWall(current, next);
      visitedCellStack.push(next);
      current = next;
    } else {
      current = visitedCellStack.pop();
    }
  }
  console.log('done');


  Object.values(grid).map((cell) => {
    cell.visited = false;
  });

  current = grid['10-4'];
  while (current && (current.getX !== 5 || current.getY !== 2)) {
    current.visited = true;
    current.drawActive(ctx);
    await delay(500);
    current.draw(ctx, 'green');
    const next = current.checkNeighbors(grid);
    if (next) {
      // removeWall(current, next);
      visitedCellStack.push(next);
      current = next;
    } else {
      current = visitedCellStack.pop();
    }
  }

  for (const cell of Object.values(grid)) {
    if (cell.visited) {
      cell.draw(ctx);
    }
  }
  console.log('done');
};

const removeWall = (current:Cell, next: Cell) => {
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
      next.walls[Wall.Top] = false
    } else {
      current.walls[Wall.Top] = false;
      next.walls[Wall.Bottom] = false;
    }
  }
}

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));
