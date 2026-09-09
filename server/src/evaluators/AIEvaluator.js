//const OpenAI = require("openai");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Evaluator = require("./Evaluator");

class AIEvaluator extends Evaluator {
  constructor() {
    super();

    this.client = new  GoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY
    });
  }

  async evaluate(problem, submission) {
    const prompt = `
You are an expert Low-Level Design interviewer.

Evaluate the learner's design.

Important:
- There can be multiple valid LLD solutions.
- Do not compare against one fixed reference implementation.
- Give evidence from the learner's submission.
- Focus on responsibilities, coupling, cohesion,
  abstraction, extensibility, edge cases and trade-offs.

Problem:
${problem.title}

Description:
${problem.description}

Requirements:
${problem.requirements}

Learner assumptions:
${submission.assumptions}

Learner classes:
${submission.classes}

Learner responsibilities:
${submission.responsibilities}

Learner explanation:
${submission.explanation}

Learner trade-offs:
${submission.tradeoffs}

Return JSON containing:
overallScore,
summary,
strengths,
improvements,
retryChallenge,
criteria.

Each criterion must contain:
criterion,
score,
evidence,
concern,
suggestion,
confidence.
`;

    const response = await this.client.responses.create({
      model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
      input: prompt
    });
    // const model = this.client.getGenerativeModel({ 
    // model: process.env.GEMINI_MODEL || "gemini-1.5-flash" 
    // });

    return JSON.parse(response.output_text);
  }
}

module.exports = AIEvaluator;