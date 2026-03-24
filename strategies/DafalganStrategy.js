import { DrugStrategy } from "./DrugStrategy";

export class DafalganStrategy extends DrugStrategy {
  updateBenefit(drug) {
    drug.benefit -= this.isExpired(drug) ? 4 : 2;
  }
}
