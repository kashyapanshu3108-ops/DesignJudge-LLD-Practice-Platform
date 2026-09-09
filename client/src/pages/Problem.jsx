import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProblem,
  createAttempt
} from "../services/api";

function Problem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [problem, setProblem] = useState(null);

  useEffect(() => {
    getProblem(id)
      .then((res) => setProblem(res.data))
      .catch(console.error);
  }, [id]);

  async function startPractice() {
    const response = await createAttempt(id);

    navigate(`/practice/${response.data.id}`);
  }

  if (!problem) {
    return <div className="container">Loading...</div>;
  }

  return (
    <main className="container">
      <div className="problem-header">
        <span>{problem.difficulty}</span>

        <h1>{problem.title}</h1>

        <p>{problem.description}</p>
      </div>

      <section className="panel">
        <h2>Requirements</h2>

        <ul>
          {problem.requirements.map((requirement) => (
            <li key={requirement}>
              {requirement}
            </li>
          ))}
        </ul>

        <button onClick={startPractice}>
          Start Practice
        </button>
      </section>
    </main>
  );
}

export default Problem;