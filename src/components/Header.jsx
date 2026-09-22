import React from "react";
import { Search, Sun, Moon, CalendarDays } from "lucide-react";

function Header({ user, search, setSearch, theme, setTheme }) {
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  }).format(new Date());

  return (
    <header className="topbar">
      <div><h2>Good morning, {user.name}! 👋</h2><p>Small steps every day lead to big results.</p></div>

      <div className="topbar-right">
        <div className="topbar-actions">
          <label className="search">
            <Search size={19}/>
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tasks..." />
          </label>
          <button className="circle-btn" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            {theme === "light" ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
          <div className="top-avatar">V</div>
        </div>
        <div className="today-label"><CalendarDays size={17}/><span>{today}</span></div>
      </div>
    </header>
  );
}

export default Header;
