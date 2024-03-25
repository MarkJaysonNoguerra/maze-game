import {Wall as Move} from "./walls.js";
export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  update(move) {
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
