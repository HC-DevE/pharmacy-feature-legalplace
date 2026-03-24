const BENEFIT_MIN = 0;
const BENEFIT_MAX = 50;

export class DrugStrategy {
  update(drug) {
    this.updateBenefit(drug);
    this.updateExpiry(drug);
    this.clampBenefit(drug);
  }

  updateBenefit(drug) {
    drug.benefit -= this.isExpired(drug) ? 2 : 1;
  }

  updateExpiry(drug) {
    drug.expiresIn -= 1;
  }

  isExpired(drug) {
    return drug.expiresIn <= 0;
  }

  clampBenefit(drug) {
    drug.benefit = Math.min(drug.benefit, BENEFIT_MAX);
    drug.benefit = Math.max(drug.benefit, BENEFIT_MIN);
  }
}
