import React from "react";
import { CheckCircle2, ListTodo, PieChart, TimerReset } from "lucide-react";

function StatsGrid({ stats }) {
  const cards = [
    { label: "Total Tasks", value: stats.total, note: "All your tasks", icon: ListTodo, tone: "purple" },
    { label: "Active", value: stats.active, note: "Keep it going!", icon: TimerReset, tone: "blue" },
    { label: "Completed", value: stats.completed, note: "Great job!", icon: CheckCircle2, tone: "green" },
    { label: "Progress", value: `${stats.progress}%`, note: "Keep pushing!", icon: PieChart, tone: "orange" }
  ];

  return (
    <section className="stats-grid">
      {cards.map(({label, value, note, icon: Icon, tone}) => (
        <article className="stat-card" key={label}>
          <div className={`stat-icon ${tone}`}><Icon size={24}/></div>
          <div><p>{label}</p><h3>{value}</h3><span>{note}</span></div>
        </article>
      ))}
    </section>
  );
}

export default StatsGrid;
