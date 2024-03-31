import { Position } from "../class";
import { Direction } from "../enum";
import { GridData } from "../type";

export interface Agent {
  myTurn: boolean;
  position: Position;
  coordinate: Position;
  onGoalArea: boolean;

  move(direction: Direction): void;
  reset(position: Position, grid: GridData): void;
}
