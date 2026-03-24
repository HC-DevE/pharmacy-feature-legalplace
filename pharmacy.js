import { applyUpdateRule } from "./drug";

export { Drug } from "./drug";

export class Pharmacy {
  constructor(drugs = []) {
    this.drugs = drugs;
  }

  updateBenefitValue() {
    for (const drug of this.drugs) {
      applyUpdateRule(drug);
    }
    return this.drugs;
  }
}
