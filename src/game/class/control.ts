import { Player } from ".";
import { Direction } from "../enum";
import { GridData } from "../type";

const arrowKey = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

export class Control {
  constructor(private player: Player, private grid: GridData) {
    window.addEventListener('keydown', (e: KeyboardEvent) => {
      if (
        arrowKey.includes(e.key) &&
        this.validMove(arrowKey.indexOf(e.code))
      ) {
        this.player.update(arrowKey.indexOf(e.code));
      }
    });
  }

  getPlayerPosition() {
    const { x, y } = this.player;
    return this.grid[`${x}-${y}`];
  }

  validMove(direction: Direction) {
    return !this.getPlayerPosition().walls[direction];
  }
}
