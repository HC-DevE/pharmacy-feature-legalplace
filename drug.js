export class Drug {
  constructor(name, expiresIn, benefit) {
    this.name = name;
    this.expiresIn = expiresIn;
    this.benefit = benefit;
  }
}

const BENEFIT_MIN = 0;
const BENEFIT_MAX = 50;

function clampBenefit(drug) {
  drug.benefit = Math.min(drug.benefit, BENEFIT_MAX);
  drug.benefit = Math.max(drug.benefit, BENEFIT_MIN);
}

function decreaseExpiry(drug) {
  drug.expiresIn -= 1;
}

function isExpired(drug) {
  return drug.expiresIn <= 0;
}

function updateNormalDrug(drug) {
  drug.benefit -= isExpired(drug) ? 2 : 1;
  decreaseExpiry(drug);
}

function updateHerbalTea(drug) {
  drug.benefit += isExpired(drug) ? 2 : 1;
  decreaseExpiry(drug);
}

function updateFervex(drug) {
  if (isExpired(drug)) {
    drug.benefit = 0;
  } else if (drug.expiresIn <= 5) {
    drug.benefit += 3;
  } else if (drug.expiresIn <= 10) {
    drug.benefit += 2;
  } else {
    drug.benefit += 1;
  }
  decreaseExpiry(drug);
}

function updateMagicPill() {
  // Never expires, benefit never changes
}

function updateDafalgan(drug) {
  drug.benefit -= isExpired(drug) ? 4 : 2;
  decreaseExpiry(drug);
}

export function applyUpdateRule(drug) {
  switch (drug.name) {
    case "Herbal Tea":
      updateHerbalTea(drug);
      break;
    case "Magic Pill":
      updateMagicPill(drug);
      break;
    case "Fervex":
      updateFervex(drug);
      break;
    case "Dafalgan":
      updateDafalgan(drug);
      break;
    default:
      updateNormalDrug(drug);
      break;
  }
  clampBenefit(drug);
}
