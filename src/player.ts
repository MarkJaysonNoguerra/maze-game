import { Wall as Move } from './walls';

export class Player {
  constructor(public x: number, public y: number) {}

  update(move: Move) {
    switch (move) {
      case Move.Top:
        this.y -= 1;
        break;
      case Move.Right:
        this.x += 1;
        break;
      case Move.Bottom:
        this.y += 1;
        break;
      case Move.Left:
        this.x -= 1;
        break;
    }
  }
}
