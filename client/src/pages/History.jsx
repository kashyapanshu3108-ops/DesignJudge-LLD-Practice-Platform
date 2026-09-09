import { useEffect, useState } from "react";
import { getAttempts } from "../services/api";

function History() {
  const [attempts, setAttempts] = useState([]);

  useEffect(() => {
    getAttempts()
      .then((res) => setAttempts(res.data))
      .catch(console.error);
  }, []);

  return (
    <main className="container">
      <h1>Your Practice History</h1>

      <div className="history-list">
        {attempts.map((attempt) => (
          <article
            className="history-card"
            key={attempt.id}
          >
            <div>
              <h3>
                {attempt.problem_title}
              </h3>

              <p>{attempt.status}</p>
            </div>

            <strong>
              {attempt.overall_score ?? "--"}/100
            </strong>
          </article>
        ))}
      </div>
    </main>
  );
}

export default History;