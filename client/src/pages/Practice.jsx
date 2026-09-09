import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { submitAttempt } from "../services/api";

function Practice() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    assumptions: "",
    classes: "",
    responsibilities: "",
    explanation: "",
    tradeoffs: ""
  });

  const [loading, setLoading] = useState(false);

  function updateField(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    try {
      await submitAttempt(id, form);

      navigate(`/feedback/${id}`);
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Submission failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>Design your solution</h1>

      <p>
        There is no single perfect design. Explain your
        decisions clearly.
      </p>

      <form onSubmit={handleSubmit} className="practice-form">

        <label>
          Assumptions
          <textarea
            name="assumptions"
            value={form.assumptions}
            onChange={updateField}
            placeholder="What assumptions are you making?"
          />
        </label>

        <label>
          Classes
          <textarea
            name="classes"
            value={form.classes}
            onChange={updateField}
            placeholder="List your classes/interfaces."
          />
        </label>

        <label>
          Responsibilities
          <textarea
            name="responsibilities"
            value={form.responsibilities}
            onChange={updateField}
            placeholder="Explain what each class is responsible for."
          />
        </label>

        <label>
          Design Explanation
          <textarea
            name="explanation"
            value={form.explanation}
            onChange={updateField}
            placeholder="Explain relationships and design decisions."
          />
        </label>

        <label>
          Trade-offs
          <textarea
            name="tradeoffs"
            value={form.tradeoffs}
            onChange={updateField}
            placeholder="What trade-offs did you make?"
          />
        </label>

        <button disabled={loading}>
          {loading
            ? "Evaluating..."
            : "Submit Design"}
        </button>
      </form>
    </main>
  );
}

export default Practice;