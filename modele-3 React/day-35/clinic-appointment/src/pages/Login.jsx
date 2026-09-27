// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Real version: call your auth backend, store a token/session.
    navigate("/appointments");
  }

  return (
    <section>
      <h1>Log in</h1>
      <form onSubmit={handleSubmit} className="stacked-form">
        <label>
          Email
          <input type="email" required placeholder="you@example.com" />
        </label>
        <label>
          Password
          <input type="password" required placeholder="••••••••" />
        </label>
        <button type="submit" className="btn-primary">Log in</button>
      </form>
    </section>
  );
}
