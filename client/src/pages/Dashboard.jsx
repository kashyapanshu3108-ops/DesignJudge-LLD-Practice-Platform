import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProblems } from "../services/api";

function Dashboard() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    getProblems()
      .then((res) => setProblems(res.data))
      .catch(console.error);
  }, []);

  return (
    <main className="container">
      <header className="hero">
        <p className="eyebrow">DESIGNJUDGE</p>

        <h1>Practice LLD. Understand your design.</h1>

        <p>
          Solve real Low-Level Design problems and get
          explainable feedback on your design decisions.
        </p>

        <Link to="/history" className="secondary-btn">
          View History
        </Link>
      </header>

      <section>
        <h2>Choose a Problem</h2>

        <div className="problem-grid">
          {problems.map((problem) => (
            <article className="problem-card" key={problem.id}>
              <span>{problem.difficulty}</span>

              <h3>{problem.title}</h3>

              <p>{problem.description}</p>

              <Link to={`/problem/${problem.id}`}>
                Practice →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Dashboard;