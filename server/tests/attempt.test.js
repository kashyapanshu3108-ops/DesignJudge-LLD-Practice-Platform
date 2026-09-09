import { describe, it, expect } from "vitest";
const Attempt = require("../src/domain/Attempt");

describe("Attempt", () => {
  it("should submit a draft attempt", () => {
    const attempt = new Attempt({
      id: 1,
      problemId: 1,
      status: "DRAFT"
    });

    attempt.submit();

    expect(attempt.status).toBe("SUBMITTED");
  });

  it("should not submit an already submitted attempt", () => {
    const attempt = new Attempt({
      id: 1,
      problemId: 1,
      status: "SUBMITTED"
    });

    expect(() => attempt.submit()).toThrow();
  });

  it("should complete evaluation", () => {
    const attempt = new Attempt({
      id: 1,
      problemId: 1,
      status: "EVALUATING"
    });

    attempt.completeEvaluation();

    expect(attempt.status).toBe("COMPLETED");
  });

  it("should fail evaluation", () => {
    const attempt = new Attempt({
      id: 1,
      problemId: 1,
      status: "EVALUATING"
    });

    attempt.failEvaluation();

    expect(attempt.status).toBe("FAILED");
  });
});