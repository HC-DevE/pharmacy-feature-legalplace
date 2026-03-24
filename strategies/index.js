import { DrugStrategy } from "./DrugStrategy";
import { HerbalTeaStrategy } from "./HerbalTeaStrategy";
import { MagicPillStrategy } from "./MagicPillStrategy";
import { FervexStrategy } from "./FervexStrategy";
import { DafalganStrategy } from "./DafalganStrategy";

const strategies = {
  "Herbal Tea": new HerbalTeaStrategy(),
  "Magic Pill": new MagicPillStrategy(),
  "Fervex": new FervexStrategy(),
  "Dafalgan": new DafalganStrategy(),
};

const defaultStrategy = new DrugStrategy();

export function getStrategy(drugName) {
  return strategies[drugName] || defaultStrategy;
}
