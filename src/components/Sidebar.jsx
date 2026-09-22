import React,{ useState } from "react";
import {
  CalendarDays, Check, CheckCircle2, ChevronDown, LogOut, Moon, Plus,
  Settings, Sun, UserRound, BriefcaseBusiness, BookOpen, Heart,
  LayoutDashboard
} from "lucide-react";

function Sidebar({ user, view, setView, category, setCategory, counts, stats, theme, setTheme, onLogout, onAddTask }) {
  const [openProfile, setOpenProfile] = useState(false);

  const items = [
    { label: "All Tasks", icon: LayoutDashboard, count: stats.total },
    { label: "Today", icon: Sun, count: null },
    { label: "Upcoming", icon: CalendarDays, count: null },
    { label: "Completed", icon: CheckCircle2, count: stats.completed }
  ];

  const categories = [
    { label: "Work", icon: BriefcaseBusiness },
    { label: "Personal", icon: Heart },
    { label: "Study", icon: BookOpen }
  ];

  return (
    <aside className="sidebar">
      <div>
        <div className="brand">
          <div className="brand-mark"><Check size={23} strokeWidth={3} /></div>
          <h1>Taskify</h1>
        </div>

        <button className="sidebar-add" onClick={onAddTask}><Plus size={19}/>Add New Task</button>

        <nav className="sidebar-nav">
          {items.map(({label, icon: Icon, count}) => (
            <button key={label} className={`sidebar-link ${view === label ? "active" : ""}`}
              onClick={() => { setView(label); setCategory("All"); }}>
              <Icon size={19}/><span>{label}</span>{count !== null && <strong>{count}</strong>}
            </button>
          ))}
        </nav>

        <div className="side-divider" />
        <p className="side-heading">CATEGORIES</p>

        <div className="sidebar-nav">
          {categories.map(({label, icon: Icon}) => (
            <button key={label} className={`sidebar-link category-link ${category === label ? "active" : ""}`}
              onClick={() => { setCategory(label); setView("All Tasks"); }}>
              <Icon size={19}/><span>{label}</span><strong>{counts[label] || 0}</strong>
            </button>
          ))}
        </div>

        <div className="productivity-card">
          <div className="plant">🌱</div>
          <div><strong>Stay productive!</strong><p>You've got this. Keep going and achieve your goals.</p></div>
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="theme-row" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? <Moon size={19}/> : <Sun size={19}/>}
          <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          <span className={`switch ${theme === "dark" ? "on" : ""}`}><span /></span>
        </button>

        <div className="profile-wrap">
          {openProfile && (
            <div className="profile-menu">
              <button><UserRound size={17}/>Profile</button>
              <button><Settings size={17}/>Settings</button>
              <button className="danger" onClick={onLogout}><LogOut size={17}/>Logout</button>
            </div>
          )}

          <button className="profile-button" onClick={() => setOpenProfile((v) => !v)}>
            <div className="avatar">V</div>
            <div><strong>{user.name}</strong><span>Stay focused</span></div>
            <ChevronDown size={18} className={openProfile ? "rotate" : ""}/>
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
