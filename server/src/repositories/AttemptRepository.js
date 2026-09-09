class AttemptRepository {
  constructor(db) {
    this.db = db;
  }

  createAttempt(problemId) {
    const result = this.db
      .prepare(`
        INSERT INTO attempts (problem_id, status)
        VALUES (?, 'DRAFT')
      `)
      .run(problemId);

    return this.getAttempt(result.lastInsertRowid);
  }

  getAttempt(id) {
    return this.db
      .prepare(`
        SELECT *
        FROM attempts
        WHERE id = ?
      `)
      .get(id);
  }

  updateAttemptStatus(id, status) {
    this.db
      .prepare(`
        UPDATE attempts
        SET status = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `)
      .run(status, id);
  }

  saveSubmission(attemptId, submission) {
    return this.db
      .prepare(`
        INSERT INTO submissions
        (
          attempt_id,
          assumptions,
          classes,
          responsibilities,
          explanation,
          tradeoffs
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .run(
        attemptId,
        submission.assumptions,
        submission.classes,
        submission.responsibilities,
        submission.explanation,
        submission.tradeoffs || ""
      );
  }

  saveEvaluation(attemptId, evaluation) {
    const insertEvaluation = this.db.prepare(`
      INSERT INTO evaluations
      (
        attempt_id,
        overall_score,
        status,
        summary,
        strengths,
        improvements,
        retry_challenge
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    const result = insertEvaluation.run(
      attemptId,
      evaluation.overallScore,
      "COMPLETED",
      evaluation.summary,
      JSON.stringify(evaluation.strengths),
      JSON.stringify(evaluation.improvements),
      evaluation.retryChallenge
    );

    const evaluationId = result.lastInsertRowid;

    const insertCriterion = this.db.prepare(`
      INSERT INTO criterion_results
      (
        evaluation_id,
        criterion,
        score,
        evidence,
        concern,
        suggestion,
        confidence
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);

    for (const item of evaluation.criteria) {
      insertCriterion.run(
        evaluationId,
        item.criterion,
        item.score,
        item.evidence,
        item.concern,
        item.suggestion,
        item.confidence
      );
    }
  }
}

module.exports = AttemptRepository;