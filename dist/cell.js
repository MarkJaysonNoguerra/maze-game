export class Cell {
  constructor(x, y, maxRow, maxColumn) {
    this.x = x;
    this.y = y;
    this.maxRow = maxRow;
    this.maxColumn = maxColumn;
    this.visited = false;
    this.walls = [true, true, true, true];
  }
  get getX() {
    return this.x;
  }
  get getY() {
    return this.y;
  }
  getNeighbors(grid) {
    return [
      grid[this.getNeighborIndex(this.x, this.y - 1)],
      grid[this.getNeighborIndex(this.x + 1, this.y)],
      grid[this.getNeighborIndex(this.x, this.y + 1)],
      grid[this.getNeighborIndex(this.x - 1, this.y)]
    ].filter(Boolean);
  }
  checkNeighbors(grid) {
    const neigbors = this.getNeighbors(grid).filter(({visited}) => !visited);
    if (neigbors.length > 0) {
      return neigbors[Math.floor(Math.random() * neigbors.length)];
    }
    return void 0;
  }
  getNeighborIndex(x, y) {
    if (x < 0 || y < 0 || x > this.maxColumn || y > this.maxRow) {
      return "";
    }
    return `${x}-${y}`;
  }
}
