import { GridData } from './grid';
import { Player } from './player';
import { Wall as Move } from './walls';

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

  validMove(move: Move) {
    return !this.getPlayerPosition().walls[move];
  }
}
