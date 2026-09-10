import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getAttempt } from "../services/api";

function Feedback() {
  const { id } = useParams();

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let interval;

    async function loadAttempt() {
      try {
        const response = await getAttempt(id);

        setData(response.data);

        const status = response.data.attempt.status;

        // Stop polling when evaluation finishes
        if (
          status === "COMPLETED" ||
          status === "FAILED"
        ) {
          clearInterval(interval);
        }

      } catch (err) {
        setError(
          err.response?.data?.message ||
          "Unable to load evaluation."
        );
      }
    }

    loadAttempt();

    // Check every 2 seconds
    interval = setInterval(loadAttempt, 2000);

    return () => clearInterval(interval);

  }, [id]);

  if (error) {
    return (
      <main className="container">
        <div className="error-box">
          <h2>Something went wrong</h2>
          <p>{error}</p>

          <Link to="/">
            Back to Problems
          </Link>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="container loading-page">
        <div className="loader"></div>
        <h2>Loading your design review...</h2>
      </main>
    );
  }

  const status = data.attempt.status;

  // Evaluation in progress
  if (status === "EVALUATING") {
    return (
      <main className="container loading-page">

        <div className="evaluation-icon">
          ✦
        </div>

        <p className="eyebrow">
          DESIGNJUDGE
        </p>

        <h1>
          Your design is being evaluated
        </h1>

        <p>
          We're reviewing your responsibilities,
          abstractions, coupling, extensibility
          and design decisions.
        </p>

        <div className="progress-bar">
          <div></div>
        </div>

        <span className="status-text">
          Evaluation in progress...
        </span>

      </main>
    );
  }

  // Evaluation failed
  if (status === "FAILED") {
    return (
      <main className="container loading-page">

        <div className="failed-icon">
          !
        </div>

        <h1>
          Evaluation couldn't be completed
        </h1>

        <p>
          Your submission is safely saved.
          You can retry the evaluation.
        </p>

        <Link to="/">
          Back to Problems
        </Link>

      </main>
    );
  }

  const { evaluation, criteria } = data;

  return (
    <main className="container">

      <div className="feedback-header">

        <div>
          <p className="eyebrow">
            DESIGN REVIEW
          </p>

          <h1>
            {data.attempt.problem_title}
          </h1>

          <p>
            Here's what you can improve in your design.
          </p>
        </div>

        <div className="score-circle">
          <strong>
            {evaluation?.overall_score ?? 0}
          </strong>
          <span>/100</span>
        </div>

      </div>

      <section className="panel">
        <p className="eyebrow">
          OVERVIEW
        </p>

        <h2>Overall feedback</h2>

        <p>
          {evaluation?.summary}
        </p>
      </section>

      <section>

        <div className="section-heading">
          <div>
            <p className="eyebrow">
              RUBRIC
            </p>

            <h2>
              Criterion Feedback
            </h2>
          </div>
        </div>

        <div className="feedback-grid">

          {criteria.map((item) => (
            <article
              className="feedback-card"
              key={item.id}
            >

              <div className="feedback-title">

                <h3>
                  {item.criterion}
                </h3>

                <strong>
                  {item.score}/10
                </strong>

              </div>

              <div className="feedback-section">
                <span>Evidence</span>
                <p>{item.evidence}</p>
              </div>

              <div className="feedback-section">
                <span>Concern</span>
                <p>{item.concern}</p>
              </div>

              <div className="feedback-section">
                <span>Suggestion</span>
                <p>{item.suggestion}</p>
              </div>

            </article>
          ))}

        </div>

      </section>

      <section className="retry-box">

        <p className="eyebrow">
          NEXT CHALLENGE
        </p>

        <h2>
          Improve this weakness
        </h2>

        <p>
          {evaluation?.retry_challenge}
        </p>

        <Link to="/">
          Try another problem →
        </Link>

      </section>

      <Link to="/history">
        View Practice History →
      </Link>

    </main>
  );
}

export default Feedback;