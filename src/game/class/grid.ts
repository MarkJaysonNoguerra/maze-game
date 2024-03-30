import { Cell, MazeInfo, Position } from "@/game/class";
import { Direction } from "@/game/enum";
import { gridIndex, isEqualPosition } from "@/game/helper";
import { GridData } from "@/game/type";

export class Grid {
  public gridData: GridData = {};

  constructor(private mazeInfo: MazeInfo) {}

  get cells(): Cell[] {
    return Object.values(this.gridData);
  }

  reset(): Grid {
    this.gridData = {};
    return this;
  }

  generate(): Grid {
    for (let index = 0; index < this.mazeInfo.cellCount; index++) {
      const x = index % this.mazeInfo.column;
      const y = Math.floor(index / this.mazeInfo.column);

      this.gridData[gridIndex(new Position(x, y))] = new Cell(
        x,
        y,
        this.mazeInfo.lastCell
      );
    }

    return this;
  }

  resetVisited(): Grid {
    for (const item of this.cells.filter(({ visited }) => visited)) {
      item.visited = false;
    }
    return this;
  }

  private isGoalReached(path: Cell[]) {
    return isEqualPosition(path[path.length - 1].position, this.mazeInfo.goal);
  }

  shortestPath(position: Position): Grid {
    const queue = [[this.gridData[gridIndex(position)]]];

    while (!this.isGoalReached(queue[0])) {
      const current = queue.shift() as Cell[];
      const currentFinalCell = current[current?.length - 1];

      const availableMoves = currentFinalCell
        .getNeighbors(this.gridData)
        .filter(({ visited }) => visited);

      for (const move of availableMoves) {
        move.visited = false;
        queue.push([...current, move]);
      }
    }

    const shortestPath = queue[0];
    for (const [index, cell] of shortestPath.entries()) {
      if (index === 0) {
        continue;
      }
      this.removeWalls(shortestPath[index - 1], cell);
    }

    return this;
  }

  generatePath(position: Position) {
    this.findPath(position).shortestPath(position).resetVisited();
    return this;
  }

  findPath(position: Position): Grid {
    const visitedCellStack: Cell[] = [];
    let current: Cell | undefined = this.gridData[gridIndex(position)];
    current.visited = true;

    while (current && !this.isGoalCell(current.position)) {
      const next: Cell | undefined = current.checkNeighbors(this.gridData);

      if (next) {
        visitedCellStack.push(next);
        current = next;
        current.visited = true;
      } else {
        current = visitedCellStack.pop();
      }
    }

    return this;
  }

  randomWalk(): Grid {
    const visitedCellStack: Cell[] = [];

    let current: Cell | undefined = this.gridData[
      gridIndex(
        new Position(
          Math.floor(Math.random() * this.mazeInfo.column),
          Math.floor(Math.random() * this.mazeInfo.row)
        )
      )
    ] as Cell;
    current.visited = true;

    while (current) {
      const next = current.checkNeighbors(this.gridData);
      if (next) {
        this.removeWalls(current, next);
        visitedCellStack.push(next);
        current = next;
        current.visited = true;
      } else {
        current = visitedCellStack.pop();
      }
    }

    return this;
  }

  private removeWalls(current: Cell, next: Cell): void {
    const { x: currentX, y: currentY } = current.position;
    const { x: nextX, y: nextY } = next.position;

    if (nextX !== currentX) {
      if (nextX > currentX) {
        current.walls[Direction.Right] = false;
        next.walls[Direction.Left] = false;
      } else {
        current.walls[Direction.Left] = false;
        next.walls[Direction.Right] = false;
      }
    } else {
      if (nextY > currentY) {
        current.walls[Direction.Bottom] = false;
        next.walls[Direction.Top] = false;
      } else {
        current.walls[Direction.Top] = false;
        next.walls[Direction.Bottom] = false;
      }
    }

    this.ensureMazeEdgeWalls(current)
    this.ensureMazeEdgeWalls(next);
  }

  private ensureMazeEdgeWalls(cell: Cell): void {
    const {
      position: { x, y },
      walls,
    } = cell;

    if (x === this.mazeInfo.column - 1) {
      walls[Direction.Right] = true;
    }

    if (x === 0) {
      walls[Direction.Left] = true;
    }

    if (y === this.mazeInfo.row - 1) {
      walls[Direction.Bottom] = true;
    }

    if (y === 0) {
      walls[Direction.Top] = true;
    }
  }

  private isGoalCell(position: Position) {
    return isEqualPosition(this.mazeInfo.goal, position);
  }
}
