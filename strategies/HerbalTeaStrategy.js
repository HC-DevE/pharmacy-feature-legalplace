import { DrugStrategy } from "./DrugStrategy";

export class HerbalTeaStrategy extends DrugStrategy {
  updateBenefit(drug) {
    drug.benefit += this.isExpired(drug) ? 2 : 1;
  }
}
