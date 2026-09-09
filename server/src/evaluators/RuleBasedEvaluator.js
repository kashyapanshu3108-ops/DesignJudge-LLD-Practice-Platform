const Evaluator = require("./Evaluator");

class RuleBasedEvaluator extends Evaluator {
  async evaluate(problem, submission) {
    const results = [];

    const fields = [
      ["Requirement Understanding", submission.assumptions],
      ["Class Responsibilities", submission.classes],
      ["Design Explanation", submission.explanation],
      ["Trade-offs", submission.tradeoffs]
    ];

    for (const [criterion, value] of fields) {
      const present = value && value.trim().length > 20;

      results.push({
        criterion,
        score: present ? 8 : 4,
        evidence: present
          ? "The learner provided meaningful content."
          : "The submitted section is missing or too short.",
        concern: present
          ? "No major structural concern detected."
          : "The design does not provide enough evidence.",
        suggestion: present
          ? "Make the reasoning more specific with concrete examples."
          : "Provide more detailed design reasoning.",
        confidence: 0.75
      });
    }

    const overallScore = Math.round(
      results.reduce((sum, item) => sum + item.score, 0) / results.length * 10
    );

    return {
      overallScore,
      summary:
        "The design has been evaluated using the deterministic MVP rubric.",
      strengths: [
        "Structured submission provided",
        "Core design reasoning is present"
      ],
      improvements: [
        "Explain responsibilities more precisely",
        "Discuss extensibility and trade-offs"
      ],
      retryChallenge:
        "Improve the design by explaining how a new requirement can be added without modifying existing responsibilities.",
      criteria: results
    };
  }
}

module.exports = RuleBasedEvaluator;