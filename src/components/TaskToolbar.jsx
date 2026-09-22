import React from "react";
import { BriefcaseBusiness, BookOpen, Grid2X2, Heart } from "lucide-react";

function TaskToolbar({ category, setCategory, sortBy, setSortBy }) {
  const filters = [
    { label: "All", icon: Grid2X2 },
    { label: "Work", icon: BriefcaseBusiness },
    { label: "Personal", icon: Heart },
    { label: "Study", icon: BookOpen }
  ];

  return (
    <section className="task-toolbar">
      <div className="filter-pills">
        {filters.map(({label, icon: Icon}) => (
          <button key={label} className={category === label ? "active" : ""} onClick={() => setCategory(label)}>
            <Icon size={17}/>{label}
          </button>
        ))}
      </div>

      <div className="sort-box">
        <span>Sort by:</span>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option>Latest</option><option>Oldest</option><option>Priority</option><option>Due date</option>
        </select>
      </div>
    </section>
  );
}

export default TaskToolbar;
