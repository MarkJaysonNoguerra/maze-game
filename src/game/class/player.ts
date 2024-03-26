import { Direction } from "../enum";

export class Player {
  constructor(public x: number, public y: number) {}

  update(direction: Direction) {
    switch (direction) {
      case Direction.Top:
        this.y -= 1;
        break;
      case Direction.Right:
        this.x += 1;
        break;
      case Direction.Bottom:
        this.y += 1;
        break;
      case Direction.Left:
        this.x -= 1;
        break;
    }
  }
}
