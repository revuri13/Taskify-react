import React, { useEffect, useState } from "react";
import { Plus, Save, X } from "lucide-react";

function TaskComposer({ onAdd, editingTask, onUpdate, onCancelEdit, inputRef }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState(new Date().toISOString().slice(0,10));
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingTask) {
      setText(editingTask.text);
      setCategory(editingTask.category);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
      inputRef.current?.focus();
    }
  }, [editingTask, inputRef]);

  function reset() {
    setText("");
    setCategory("Work");
    setPriority("Medium");
    setDueDate(new Date().toISOString().slice(0,10));
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!text.trim()) {
      setError("Please enter a task.");
      inputRef.current?.focus();
      return;
    }

    if (editingTask) {
      onUpdate({ ...editingTask, text: text.trim(), category, priority, dueDate });
    } else {
      onAdd({ text, category, priority, dueDate });
    }
    reset();
  }

  return (
    <section className="composer-card">
      <form onSubmit={handleSubmit}>
        <div className="composer-main">
          <div className="composer-check" />
          <input ref={inputRef} value={text} onChange={(e) => setText(e.target.value)}
            placeholder="What do you need to complete?" />
          <button className="primary-btn" type="submit">
            {editingTask ? <Save size={18}/> : <Plus size={18}/>}
            {editingTask ? "Save Task" : "Add Task"}
          </button>
          {editingTask && (
            <button className="icon-btn soft" type="button" onClick={() => { onCancelEdit(); reset(); }}>
              <X size={18}/>
            </button>
          )}
        </div>

        <div className="composer-options">
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Work</option><option>Personal</option><option>Study</option>
          </select>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>High</option><option>Medium</option><option>Low</option>
          </select>
          <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
          {error && <span className="inline-error">{error}</span>}
        </div>
      </form>
    </section>
  );
}

export default TaskComposer;
