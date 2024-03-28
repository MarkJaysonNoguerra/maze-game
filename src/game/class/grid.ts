import { Cell, MazeInfo, Position } from "@/game/class";
import { Direction } from "@/game/enum";
import { gridIndex } from "@/game/helper";
import { GridData } from "@/game/type";

export class Grid {
  public gridData: GridData = {};
  private visitedCellStack: Cell[] = [];

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

      this.gridData[`${x}-${y}`] = new Cell(x, y, this.mazeInfo.lastCell);
    }

    return this;
  }

  resetVisited(): Grid {
    for (const item of this.cells) {
      item.visited = false;
    }
    return this;
  }

  findPath(position: Position): Grid {
    let current: Cell | undefined = this.gridData[gridIndex(position)];
    while (current && !this.isGoalCell(current.position)) {
      
      current.visited = true;
      const next: Cell | undefined = current.checkNeighbors(this.gridData);
      if (next) {
        this.removeWalls(current, next);
        this.visitedCellStack.push(next);
        current = next;
      } else {
        current = this.visitedCellStack.pop();
      }
    }

    return this;
  }

  fillUnvisitedPath(): Grid {
    let current: Cell | undefined = this.firstUnvisitedCell();

    while (current) {
      current.visited = true;
      const next = current.checkNeighbors(this.gridData);
      if (next) {
        this.removeWalls(current, next);
        this.visitedCellStack.push(next);
        current = next;
      } else {
        current = this.visitedCellStack.pop();
        if (!current) {
          current = this.firstUnvisitedCell();
        }
      }
    }

    return this;
  }

  removeWalls(current: Cell, next: Cell): Grid {
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

    return this;
  }

  private firstUnvisitedCell(): Cell | undefined {
    return this.cells.filter(({ visited }) => !visited)[0];
  }

  private isGoalCell(position: Position) {
    const { x, y } = this.mazeInfo.goal;
    return x === position.x && y === position.y;
  }
}
