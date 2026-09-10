# Research Note

## 1. Learner Problem

Low-Level Design is difficult to practice because there is
often no single objectively correct solution.

A learner may understand the requirements but still struggle
with:

- assigning responsibilities
- choosing abstractions
- controlling coupling
- maintaining cohesion
- deciding when to use interfaces
- thinking about extensibility
- identifying edge cases

Existing learning resources often provide problem statements
or reference solutions, but this does not always explain why
a learner's own design could be improved.

## 2. Existing Approaches

### Interview Preparation Platforms

Many interview platforms focus heavily on coding problems.
LLD practice is often represented as articles, questions,
or interview prompts rather than a complete iterative
practice-feedback loop.

### GitHub / Community Resources

GitHub contains many LLD examples and design-pattern
implementations. These are useful for learning but usually
require the learner to self-evaluate.

### AI Chatbots

General-purpose AI tools can review a design when the learner
provides enough context. However, unconstrained prompts may
produce inconsistent evaluations.

## 3. Gap

The opportunity identified is a focused loop:

Choose
→ Design
→ Submit
→ Explainable Feedback
→ Retry

The platform should not assume that one reference solution
is the only valid design.

## 4. Product Direction

DesignJudge focuses on structured submissions and rubric-based
feedback.

The evaluator considers:

1. Requirement understanding
2. Class responsibilities
3. Coupling and cohesion
4. Encapsulation and abstraction
5. Extensibility
6. Edge cases
7. Design explanation
8. Trade-offs

## 5. Research Insight

The most useful feedback is not simply a numerical score.

The learner needs:

- evidence
- concern
- explanation
- improvement suggestion
- next challenge

Therefore DesignJudge turns weaknesses into targeted retry
challenges.

## 6. MVP Decision

The MVP uses text-based structured submissions.

This was chosen because it provides enough evidence of LLD
thinking while keeping the prototype achievable within the
two-day assignment.

Diagram and code submissions are intentionally deferred.