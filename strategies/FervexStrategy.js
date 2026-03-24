import { DrugStrategy } from "./DrugStrategy";

export class FervexStrategy extends DrugStrategy {
  updateBenefit(drug) {
    // ici j'aurai pu faire un switch case mais je trouve que ça rend le code moins lisible pour ce usecase
    if (this.isExpired(drug)) {
      drug.benefit = 0;
    } else if (drug.expiresIn <= 5) {
      drug.benefit += 3;
    } else if (drug.expiresIn <= 10) {
      drug.benefit += 2;
    } else {
      drug.benefit += 1;
    }
  }
}
