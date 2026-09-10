# AI Usage

AI tools were used as a development assistant during the
assignment.

## Decision 1 — Submission Format

### AI suggestion

Use a combination of code, diagrams and structured text.

### Decision

I rejected the full combination for the MVP.

### Why

The assignment is limited to two days. Structured text provides
enough evidence of LLD reasoning while keeping the core practice
loop reliable.

---

## Decision 2 — Database

### AI suggestion

MongoDB could be used for storing attempts and evaluations.

### Decision

Rejected.

### Why

The domain has clear relational relationships between problems,
attempts, submissions, evaluations and criterion results.
SQLite also keeps the prototype simple and allows me to use
SQL knowledge.

---

## Decision 3 — Evaluation

### AI suggestion

Use an unconstrained LLM prompt to ask whether a design is good.

### Decision

Rejected.

### Why

A single score would be difficult to explain and could be
inconsistent.

Instead, the evaluator uses a fixed rubric and asks for:

- score
- evidence
- concern
- suggestion
- confidence

---

## Decision 4 — Evaluator Architecture

### AI suggestion

Put AI evaluation directly inside the submission route.

### Decision

Rejected as the long-term design.

### Why

It would tightly couple the practice flow to one evaluation
provider.

Instead, an Evaluator abstraction is used with:

- RuleBasedEvaluator
- AIEvaluator

---

## Decision 5 — Retry Challenge

### AI suggestion

Show only evaluation feedback.

### Decision

Expanded.

### Why

The assignment emphasizes repeated practice and improvement.
Therefore the platform converts the identified weakness into a
targeted retry challenge.

Example:

Weakness:
High coupling.

Retry:
Add a new payment method without modifying the parking
allocation logic.