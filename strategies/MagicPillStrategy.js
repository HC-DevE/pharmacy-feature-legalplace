import { DrugStrategy } from "./DrugStrategy";

export class MagicPillStrategy extends DrugStrategy {
  update() {
    // Never expires, benefit never changes
  }
}
