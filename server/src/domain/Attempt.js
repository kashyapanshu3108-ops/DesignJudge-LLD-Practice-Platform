class Attempt {
  constructor({ id, problemId, status }) {
    this.id = id;
    this.problemId = problemId;
    this.status = status;
  }

  submit() {
    if (this.status !== "DRAFT") {
      throw new Error("Only draft attempts can be submitted.");
    }

    this.status = "SUBMITTED";
  }

  startEvaluation() {
    if (this.status !== "SUBMITTED") {
      throw new Error("Attempt must be submitted first.");
    }

    this.status = "EVALUATING";
  }

  completeEvaluation() {
    if (this.status !== "EVALUATING") {
      throw new Error("Attempt is not being evaluated.");
    }

    this.status = "COMPLETED";
  }

  failEvaluation() {
    if (this.status !== "EVALUATING") {
      throw new Error("Attempt is not being evaluated.");
    }

    this.status = "FAILED";
  }
}

module.exports = Attempt;