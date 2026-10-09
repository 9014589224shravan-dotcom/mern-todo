import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get("https://mern-todo-5046.onrender.com/");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!text) return;
    await axios.post("https://mern-todo-5046.onrender.com/", { text });
    setText("");
    fetchTasks();
  };

  const toggleTask = async (task) => {
    await axios.put(`https://mern-todo-5046.onrender.com/${task._id}`, {
      completed: !task.completed,
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://mern-todo-5046.onrender.com/${id}`);
    fetchTasks();
  };

  return (
    <div className="App" style={{ maxWidth: 400, margin: "50px auto", textAlign: "center" }}>
      <h2>MERN To-Do List</h2>
      <div>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
        />
        <button onClick={addTask} style={{ background: "green", color: "white" }}>Add</button>
      </div>
      <div style={{ marginTop: 20 }}>
        {tasks.map((task) => (
          <div key={task._id} style={{ display: "flex", justifyContent: "space-between", margin: "10px 0" }}>
            <div>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
              />
              <span style={{ textDecoration: task.completed ? "line-through" : "none", marginLeft: 8 }}>
                {task.text}
              </span>
            </div>
            <button onClick={() => deleteTask(task._id)} style={{ background: "red", color: "white" }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;