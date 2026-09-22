import React from "react";
import { CalendarDays, Check, MoreVertical, Pencil, Trash2 } from "lucide-react";

function formatDate(date) {
  const today = new Date().toISOString().slice(0,10);
  const tomorrow = new Date(Date.now()+86400000).toISOString().slice(0,10);
  if (date === today) return "Today";
  if (date === tomorrow) return "Tomorrow";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(`${date}T00:00:00`));
}

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  if (!tasks.length) {
    return <div className="empty-state"><div>✓</div><h3>No tasks here</h3><p>Try adding a new task or changing your filters.</p></div>;
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <article className={`task-card category-${task.category.toLowerCase()} ${task.completed ? "done" : ""}`} key={task.id}>
          <button className={`check-btn ${task.completed ? "checked" : ""}`} onClick={() => onToggle(task.id)}>
            {task.completed && <Check size={18}/>}
          </button>

          <div className="task-content">
            <h3>{task.text}</h3>
            <div className="task-meta">
              <span className={`category-badge ${task.category.toLowerCase()}`}>{task.category}</span>
              <span className={`priority-badge ${task.priority.toLowerCase()}`}>{task.priority} Priority</span>
              <span className="date-badge"><CalendarDays size={15}/>{formatDate(task.dueDate)}</span>
              {task.completed && <span className="completed-badge">Completed</span>}
            </div>
          </div>

          <div className="task-actions">
            {!task.completed && <>
              <button className="icon-btn" onClick={() => onEdit(task)}><Pencil size={18}/></button>
              <button className="icon-btn" onClick={() => onDelete(task.id)}><Trash2 size={18}/></button>
            </>}
            <button className="icon-btn"><MoreVertical size={18}/></button>
          </div>
        </article>
      ))}
    </section>
  );
}

export default TaskList;
