import React, { useState } from "react";
import { Check, Moon, Sun } from "lucide-react";

function Login({ onLogin, theme, setTheme }) {
  const [email, setEmail] = useState("veenu@example.com");
  const [password, setPassword] = useState("taskify123");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const result = onLogin(email, password);
    if (!result.ok) setError(result.message);
  }

  return (
    <div className="login-page">
      <button
        className="floating-theme-btn"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
      >
        {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
      </button>

      <div className="login-card">
        <div className="login-brand">
          <div className="brand-mark"><Check size={24} strokeWidth={3} /></div>
          <div><h1>Taskify</h1><p>Plan better. Finish stronger.</p></div>
        </div>

        <div className="login-copy">
          <h2>Welcome back</h2>
          <p>Sign in to continue to your dashboard.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>

          <label>
            Password
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary-btn login-submit">Login</button>
        </form>

        <p className="demo-note">Demo login: any non-empty email and password will work.</p>
      </div>
    </div>
  );
}

export default Login;
