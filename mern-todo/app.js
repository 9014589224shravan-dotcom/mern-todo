import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then(res => setTasks(res.data));
  }, []);

  // 👉 Place addTask here
  const addTask = () => {
    if (!text.trim()) return; // prevent empty tasks
    axios.post("http://localhost:5000/tasks", { text, completed: false })
      .then(res => setTasks([...tasks, res.data]));
    setText(""); // clear input after adding
  };

  return (
    <div>
      <h1>MERN To‑Do App</h1>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
