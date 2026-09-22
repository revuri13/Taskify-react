import React, { useEffect, useMemo, useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("taskify-user");
    return saved ? JSON.parse(saved) : null;
  });

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("taskify-theme") || "light";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("taskify-theme", theme);
  }, [theme]);

  function handleLogin(email, password) {
    if (!email.trim() || !password.trim()) {
      return { ok: false, message: "Please enter email and password." };
    }

    const signedIn = { name: "Veenu", email };
    localStorage.setItem("taskify-user", JSON.stringify(signedIn));
    setUser(signedIn);
    return { ok: true };
  }

  function handleLogout() {
    localStorage.removeItem("taskify-user");
    setUser(null);
  }

  const auth = useMemo(
    () => ({ user, theme, setTheme, onLogout: handleLogout }),
    [user, theme]
  );

  if (!user) {
    return <Login onLogin={handleLogin} theme={theme} setTheme={setTheme} />;
  }

  return <Dashboard auth={auth} />;
}

export default App;
