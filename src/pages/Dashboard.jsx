import React, { useEffect, useMemo, useRef, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatsGrid from "../components/StatsGrid";
import TaskComposer from "../components/TaskComposer";
import TaskToolbar from "../components/TaskToolbar";
import TaskList from "../components/TaskList";

const seedTasks = [
  { id: 1, text: "Finish JavaScript project", completed: false, category: "Work", priority: "High", dueDate: new Date().toISOString().slice(0,10), createdAt: Date.now()-500000 },
  { id: 2, text: "Design portfolio homepage", completed: false, category: "Work", priority: "Medium", dueDate: new Date(Date.now()+86400000).toISOString().slice(0,10), createdAt: Date.now()-400000 },
  { id: 3, text: "Buy groceries", completed: false, category: "Personal", priority: "Low", dueDate: new Date(Date.now()+2*86400000).toISOString().slice(0,10), createdAt: Date.now()-300000 },
  { id: 4, text: "Complete array practice", completed: true, category: "Study", priority: "Medium", dueDate: new Date(Date.now()-86400000).toISOString().slice(0,10), createdAt: Date.now()-200000 }
];

function Dashboard({ auth }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("taskify-tasks");
    return saved ? JSON.parse(saved) : seedTasks;
  });
  const [search, setSearch] = useState("");
  const [view, setView] = useState("All Tasks");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [editingTask, setEditingTask] = useState(null);
  const composerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("taskify-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const active = total - completed;
    const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, active, completed, progress };
  }, [tasks]);

  const counts = useMemo(() => {
    const result = {};
    ["Work", "Personal", "Study"].forEach((c) => {
      result[c] = tasks.filter((task) => task.category === c).length;
    });
    return result;
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    const today = new Date().toISOString().slice(0,10);
    let result = [...tasks];

    if (view === "Today") result = result.filter((t) => t.dueDate === today);
    if (view === "Upcoming") result = result.filter((t) => t.dueDate > today && !t.completed);
    if (view === "Completed") result = result.filter((t) => t.completed);
    if (category !== "All") result = result.filter((t) => t.category === category);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.text.toLowerCase().includes(q));
    }

    const ranks = { High: 3, Medium: 2, Low: 1 };
    if (sortBy === "Latest") result.sort((a,b) => b.createdAt - a.createdAt);
    if (sortBy === "Oldest") result.sort((a,b) => a.createdAt - b.createdAt);
    if (sortBy === "Priority") result.sort((a,b) => ranks[b.priority] - ranks[a.priority]);
    if (sortBy === "Due date") result.sort((a,b) => a.dueDate.localeCompare(b.dueDate));

    return result;
  }, [tasks, view, category, search, sortBy]);

  function addTask(data) {
    setTasks((current) => [{
      id: Date.now(),
      text: data.text.trim(),
      completed: false,
      category: data.category,
      priority: data.priority,
      dueDate: data.dueDate,
      createdAt: Date.now()
    }, ...current]);
  }

  function updateTask(updated) {
    setTasks((current) => current.map((task) => task.id === updated.id ? { ...task, ...updated } : task));
    setEditingTask(null);
  }

  function toggleTask(id) {
    setTasks((current) => current.map((task) => task.id === id ? { ...task, completed: !task.completed } : task));
  }

  function deleteTask(id) {
    setTasks((current) => current.filter((task) => task.id !== id));
  }

  return (
    <div className="app-shell">
      <Sidebar
        user={auth.user}
        view={view}
        setView={setView}
        category={category}
        setCategory={setCategory}
        counts={counts}
        stats={stats}
        theme={auth.theme}
        setTheme={auth.setTheme}
        onLogout={auth.onLogout}
        onAddTask={() => composerRef.current?.focus()}
      />

      <main className="dashboard">
        <Header user={auth.user} search={search} setSearch={setSearch} theme={auth.theme} setTheme={auth.setTheme} />
        <StatsGrid stats={stats} />
        <TaskComposer
          onAdd={addTask}
          editingTask={editingTask}
          onUpdate={updateTask}
          onCancelEdit={() => setEditingTask(null)}
          inputRef={composerRef}
        />
        <TaskToolbar category={category} setCategory={setCategory} sortBy={sortBy} setSortBy={setSortBy} />
        <TaskList tasks={filteredTasks} onToggle={toggleTask} onDelete={deleteTask} onEdit={setEditingTask} />
      </main>
    </div>
  );
}

export default Dashboard;
