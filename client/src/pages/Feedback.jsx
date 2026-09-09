import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getAttempt } from "../services/api";

function Feedback() {
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    getAttempt(id)
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [id]);

  if (!data) {
    return (
      <main className="container">
        Loading evaluation...
      </main>
    );
  }

  const { evaluation, criteria } = data;

  return (
    <main className="container">
      <header>
        <p className="eyebrow">
          DESIGN REVIEW
        </p>

        <h1>{data.attempt.problem_title}</h1>

        <div className="score">
          {evaluation?.overall_score ?? 0}
          <small>/100</small>
        </div>
      </header>

      <section className="panel">
        <h2>Summary</h2>
        <p>{evaluation?.summary}</p>
      </section>

      <section>
        <h2>Criterion Feedback</h2>

        <div className="feedback-grid">
          {criteria.map((item) => (
            <article
              className="feedback-card"
              key={item.id}
            >
              <div className="feedback-title">
                <h3>{item.criterion}</h3>
                <strong>
                  {item.score}/10
                </strong>
              </div>

              <p>
                <b>Evidence:</b>{" "}
                {item.evidence}
              </p>

              <p>
                <b>Concern:</b>{" "}
                {item.concern}
              </p>

              <p>
                <b>Suggestion:</b>{" "}
                {item.suggestion}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="retry-box">
        <h2>🎯 Your next challenge</h2>

        <p>
          {evaluation?.retry_challenge}
        </p>
      </section>

      <Link to="/history">
        View Attempt History →
      </Link>
    </main>
  );
}

export default Feedback;