import { Participant } from "../enum";

export class MoveEvent {
  constructor(public participant: Participant, public details: string) {}
}
