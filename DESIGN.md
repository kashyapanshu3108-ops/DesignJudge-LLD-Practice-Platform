# Design Note

## 1. MVP

DesignJudge is a monolithic web application consisting of:

- React frontend
- Express backend
- SQLite database
- Evaluation abstraction
- Rule-based evaluator
- Optional AI evaluator

## 2. Core Domain

### Problem

Represents an LLD challenge.

Responsibility:
- store problem requirements
- provide context for an attempt

### Attempt

Represents one learner practice session.

Responsibilities:
- track problem
- manage attempt lifecycle
- track evaluation state

States:

DRAFT
→ SUBMITTED
→ EVALUATING
→ COMPLETED

Failure path:

EVALUATING
→ FAILED

### Submission

Stores the learner's design.

Contains:

- assumptions
- classes
- responsibilities
- explanation
- trade-offs

### Evaluation

Represents the result of evaluating a submission.

Contains:

- overall score
- summary
- strengths
- improvements
- retry challenge

### CriterionResult

Stores evidence-based feedback for one rubric criterion.

## 3. Evaluator Abstraction

The system uses:

Evaluator
    |
    +-- RuleBasedEvaluator
    |
    +-- AIEvaluator

The practice flow depends on the evaluator abstraction rather
than a specific implementation.

This allows another evaluator to be introduced later.

For example:

HumanEvaluator
CodeEvaluator
StaticAnalysisEvaluator

without changing the core practice workflow.

## 4. Repository Abstraction

Persistence is separated from domain/application logic.

The current implementation uses SQLite.

A future implementation could introduce another repository
without changing the learner-facing flow.

## 5. Evaluation Strategy

Deterministic checks are used for:

- required fields
- submission structure
- state transitions

AI is used for:

- responsibility quality
- abstraction analysis
- coupling/cohesion
- extensibility
- trade-offs
- improvement suggestions

## 6. Multiple Valid Solutions

The evaluator does not compare the learner against a single
reference implementation.

Instead it evaluates evidence against a rubric.

This is important because LLD problems can have multiple
reasonable designs.

## 7. Slow Evaluation

The submission is stored before evaluation.

The attempt state changes to:

EVALUATING

If evaluation succeeds:

COMPLETED

If evaluation fails:

FAILED

The submission is not lost.

## 8. Future Change Test A

Current submission format:

Structured text.

Future:

Class diagram.

The Attempt and Evaluation domain models do not need to
change significantly. A new submission representation can
be introduced.

## 9. Future Change Test B

Current evaluator:

RuleBasedEvaluator / AIEvaluator.

Future:

HumanEvaluator.

The Evaluator abstraction allows this without rewriting
the practice flow.

## 10. Why SQLite?

The MVP does not require a distributed database.

SQLite provides:

- relational modelling
- SQL support
- persistence
- simple setup
- zero external database dependency

It is appropriate for a two-day prototype.

## 11. Key Trade-offs

### Text instead of diagram

Pros:
- fast to implement
- easy to store
- sufficient for design reasoning

Cons:
- relationships are less visual

### SQLite instead of MongoDB

Pros:
- simple
- relational structure fits attempts/evaluations
- easy local setup

Cons:
- not intended for high-scale production workloads

### Optional AI

Pros:
- prototype remains usable without AI
- deterministic fallback
- lower operational dependency

Cons:
- AI feedback is less sophisticated without an API key