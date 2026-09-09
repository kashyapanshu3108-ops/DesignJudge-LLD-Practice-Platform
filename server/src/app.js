require("dotenv").config();

const express = require("express");
const cors = require("cors");

const db = require("./db/database");
require("./db/schema");

const ProblemRepository = require("./repositories/ProblemRepository");
const AttemptRepository = require("./repositories/AttemptRepository");

const RuleBasedEvaluator = require("./evaluators/RuleBasedEvaluator");
const AIEvaluator = require("./evaluators/AIEvaluator");

const app = express();

app.use(cors());
app.use(express.json());

const problemRepository = new ProblemRepository(db);
const attemptRepository = new AttemptRepository(db);

const useAI = Boolean(process.env.GEMINI_API_KEY);

const evaluator = useAI
  ? new AIEvaluator()
  : new RuleBasedEvaluator();

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    evaluator: useAI ? "ai" : "rule-based"
  });
});

app.get("/api/problems", (req, res) => {
  res.json(problemRepository.findAll());
});

app.get("/api/problems/:id", (req, res) => {
  const problem = problemRepository.findById(req.params.id);

  if (!problem) {
    return res.status(404).json({
      message: "Problem not found"
    });
  }

  res.json(problem);
});

app.post("/api/attempts", (req, res) => {
  const { problemId } = req.body;

  if (!problemId) {
    return res.status(400).json({
      message: "problemId is required"
    });
  }

  const problem = problemRepository.findById(problemId);

  if (!problem) {
    return res.status(404).json({
      message: "Problem not found"
    });
  }

  const attempt = attemptRepository.createAttempt(problemId);

  res.status(201).json(attempt);
});

app.post("/api/attempts/:id/submit", async (req, res) => {
  try {
    const attempt = attemptRepository.getAttempt(req.params.id);

    if (!attempt) {
      return res.status(404).json({
        message: "Attempt not found"
      });
    }

    if (attempt.status !== "DRAFT") {
      return res.status(400).json({
        message: "Attempt has already been submitted"
      });
    }

    const {
      assumptions,
      classes,
      responsibilities,
      explanation,
      tradeoffs
    } = req.body;

    if (
      !assumptions?.trim() ||
      !classes?.trim() ||
      !responsibilities?.trim() ||
      !explanation?.trim()
    ) {
      return res.status(400).json({
        message: "All required sections must be completed"
      });
    }

    attemptRepository.saveSubmission(
      attempt.id,
      {
        assumptions,
        classes,
        responsibilities,
        explanation,
        tradeoffs
      }
    );

    attemptRepository.updateAttemptStatus(
      attempt.id,
      "SUBMITTED"
    );

    const problem = problemRepository.findById(
      attempt.problem_id
    );

    const submission = {
      assumptions,
      classes,
      responsibilities,
      explanation,
      tradeoffs
    };

    attemptRepository.updateAttemptStatus(
      attempt.id,
      "EVALUATING"
    );

    let evaluation;

    try {
      evaluation = await evaluator.evaluate(
        problem,
        submission
      );

      attemptRepository.saveEvaluation(
        attempt.id,
        evaluation
      );

      attemptRepository.updateAttemptStatus(
        attempt.id,
        "COMPLETED"
      );

      res.json({
        attemptId: attempt.id,
        status: "COMPLETED",
        evaluation
      });
    } catch (evaluationError) {
      attemptRepository.updateAttemptStatus(
        attempt.id,
        "FAILED"
      );

      res.status(500).json({
        message: "Evaluation failed",
        attemptId: attempt.id,
        status: "FAILED"
      });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong"
    });
  }
});

app.get("/api/attempts", (req, res) => {
  const attempts = db.prepare(`
    SELECT
      attempts.*,
      problems.title AS problem_title,
      evaluations.overall_score
    FROM attempts
    JOIN problems
      ON problems.id = attempts.problem_id
    LEFT JOIN evaluations
      ON evaluations.attempt_id = attempts.id
    ORDER BY attempts.created_at DESC
  `).all();

  res.json(attempts);
});

app.get("/api/attempts/:id", (req, res) => {
  const attempt = db.prepare(`
    SELECT
      attempts.*,
      problems.title AS problem_title
    FROM attempts
    JOIN problems
      ON problems.id = attempts.problem_id
    WHERE attempts.id = ?
  `).get(req.params.id);

  if (!attempt) {
    return res.status(404).json({
      message: "Attempt not found"
    });
  }

  const submission = db.prepare(`
    SELECT *
    FROM submissions
    WHERE attempt_id = ?
  `).get(req.params.id);

  const evaluation = db.prepare(`
    SELECT *
    FROM evaluations
    WHERE attempt_id = ?
  `).get(req.params.id);

  let criteria = [];

  if (evaluation) {
    criteria = db.prepare(`
      SELECT *
      FROM criterion_results
      WHERE evaluation_id = ?
    `).all(evaluation.id);
  }

  res.json({
    attempt,
    submission,
    evaluation,
    criteria
  });
});

module.exports = app;