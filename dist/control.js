const arrowKey = ["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"];
export class Control {
  constructor(player, grid) {
    this.player = player;
    this.grid = grid;
    window.addEventListener("keydown", (e) => {
      if (arrowKey.includes(e.key) && this.validMove(arrowKey.indexOf(e.code))) {
        this.player.update(arrowKey.indexOf(e.code));
      }
    });
  }
  getPlayerPosition() {
    const {x, y} = this.player;
    return this.grid[`${x}-${y}`];
  }
  validMove(move) {
    return !this.getPlayerPosition().walls[move];
  }
}
