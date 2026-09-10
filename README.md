# DesignJudge

> Practice LLD. Understand your design.

DesignJudge is a focused Low-Level Design practice platform that
helps learners solve LLD problems, submit structured designs,
receive explainable feedback, review previous attempts and retry
based on identified weaknesses.

## Problem

LLD practice is easy to start but difficult to evaluate.

Learners can design systems such as Parking Lot or Elevator
but often struggle to understand:

- whether responsibilities are well distributed
- whether classes are too tightly coupled
- whether abstractions are useful
- whether the design can evolve
- whether there are important edge cases

## Solution

DesignJudge provides a focused practice loop:

Choose Problem
→ Practice
→ Submit
→ Evaluate
→ Review
→ Retry

## MVP

The MVP includes:

- 4 LLD problems
- Structured text-based submission
- Deterministic validation
- AI-assisted evaluation
- Explainable rubric feedback
- Attempt history
- Retry challenge
- Evaluation states
- SQLite persistence

## Tech Stack

Frontend:
- React
- Vite
- CSS

Backend:
- Node.js
- Express

Database:
- SQLite
- better-sqlite3

Evaluation:
- Rule-based evaluator
- Optional AI evaluator

Testing:
- Vitest
- Supertest

## Run Locally

### Backend

```bash
cd server
npm install
npm run seed
npm run dev