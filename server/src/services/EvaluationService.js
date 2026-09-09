class EvaluationService {
  constructor({ evaluator, repository }) {
    this.evaluator = evaluator;
    this.repository = repository;
  }

  async evaluate(attemptId, problem, submission) {
    await this.repository.updateAttemptStatus(
      attemptId,
      "EVALUATING"
    );

    try {
      const result = await this.evaluator.evaluate(
        problem,
        submission
      );

      await this.repository.saveEvaluation(
        attemptId,
        result
      );

      await this.repository.updateAttemptStatus(
        attemptId,
        "COMPLETED"
      );

      return result;
    } catch (error) {
      await this.repository.updateAttemptStatus(
        attemptId,
        "FAILED"
      );

      throw error;
    }
  }
}

module.exports = EvaluationService;