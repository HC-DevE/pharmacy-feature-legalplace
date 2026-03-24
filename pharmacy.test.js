import { Drug, Pharmacy } from "./pharmacy";

describe("Drug", () => {
  it("should create a drug with name, expiresIn, and benefit", () => {
    const drug = new Drug("Doliprane", 20, 30);
    expect(drug.name).toBe("Doliprane");
    expect(drug.expiresIn).toBe(20);
    expect(drug.benefit).toBe(30);
  });
});

describe("Pharmacy", () => {
  describe("normal drugs", () => {
    it("should decrease benefit and expiresIn by 1", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 20, 30)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug).toEqual(new Drug("Doliprane", 19, 29));
    });

    it("should degrade benefit twice as fast after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 0, 10)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(-1);
      expect(drug.benefit).toBe(8);
    });

    it("should never have negative benefit", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", 5, 0)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.benefit).toBe(0);
    });

    it("should never have negative benefit even after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Doliprane", -1, 1)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.benefit).toBe(0);
    });
  });

  describe("Herbal Tea", () => {
    it("should increase benefit by 1 before expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 10, 5)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(9);
      expect(drug.benefit).toBe(6);
    });

    it("should increase benefit by 2 after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 0, 5)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(-1);
      expect(drug.benefit).toBe(7);
    });

    it("should never have benefit above 50", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", 5, 50)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.benefit).toBe(50);
    });

    it("should not exceed 50 even after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Herbal Tea", -1, 49)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.benefit).toBe(50);
    });
  });

  describe("Magic Pill", () => {
    it("should never expire", () => {
      const pharmacy = new Pharmacy([new Drug("Magic Pill", 15, 40)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(15);
    });

    it("should never decrease in benefit", () => {
      const pharmacy = new Pharmacy([new Drug("Magic Pill", 15, 40)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.benefit).toBe(40);
    });
  });

  describe("Fervex", () => {
    it("should increase benefit by 1 when more than 10 days left", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 12, 35)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(11);
      expect(drug.benefit).toBe(36);
    });

    it("should increase benefit by 2 when 10 days or less", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 10, 35)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(9);
      expect(drug.benefit).toBe(37);
    });

    it("should increase benefit by 3 when 5 days or less", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 5, 35)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(4);
      expect(drug.benefit).toBe(38);
    });

    it("should drop benefit to 0 after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 0, 50)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(-1);
      expect(drug.benefit).toBe(0);
    });

    it("should never have benefit above 50", () => {
      const pharmacy = new Pharmacy([new Drug("Fervex", 3, 49)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.benefit).toBe(50);
    });
  });

  describe("Dafalgan", () => {
    it("should degrade benefit twice as fast as normal drugs", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 10, 20)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(9);
      expect(drug.benefit).toBe(18);
    });

    it("should degrade benefit 4x after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 0, 20)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.expiresIn).toBe(-1);
      expect(drug.benefit).toBe(16);
    });

    it("should never have negative benefit", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", 5, 1)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.benefit).toBe(0);
    });

    it("should never have negative benefit after expiration", () => {
      const pharmacy = new Pharmacy([new Drug("Dafalgan", -1, 3)]);
      const [drug] = pharmacy.updateBenefitValue();
      expect(drug.benefit).toBe(0);
    });
  });

  describe("output.json regression", () => {
    it("should match the expected 30-day simulation", () => {
      const drugs = [
        new Drug("Doliprane", 20, 30),
        new Drug("Herbal Tea", 10, 5),
        new Drug("Fervex", 12, 35),
        new Drug("Magic Pill", 15, 40),
      ];
      const pharmacy = new Pharmacy(drugs);
      const log = [];

      for (let day = 0; day < 30; day++) {
        log.push(JSON.parse(JSON.stringify(pharmacy.updateBenefitValue())));
      }

      const expected = require("./output.json");
      expect(log).toEqual(expected.result);
    });
  });
});
