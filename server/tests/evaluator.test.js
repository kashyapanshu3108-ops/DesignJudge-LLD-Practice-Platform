const { describe, it, expect } = require("vitest");

const RuleBasedEvaluator =
  require("../src/evaluators/RuleBasedEvaluator");

describe("RuleBasedEvaluator", () => {
  it("should evaluate a structured submission", async () => {
    const evaluator =
      new RuleBasedEvaluator();

    const result = await evaluator.evaluate(
      {
        title: "Parking Lot",
        description: "Design a parking lot"
      },
      {
        assumptions:
          "We support multiple vehicle types and multiple floors.",
        classes:
          "ParkingLot, ParkingFloor, ParkingSpot, Vehicle.",
        responsibilities:
          "ParkingLot coordinates floors. ParkingSpot manages occupancy.",
        explanation:
          "Vehicle-specific behaviour is separated from parking allocation.",
        tradeoffs:
          "The design prefers composition over inheritance."
      }
    );

    expect(result.overallScore).toBeGreaterThan(0);
    expect(result.criteria.length).toBeGreaterThan(0);
  });
});