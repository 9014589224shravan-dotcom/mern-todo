import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:5000/tasks" 
  : "https://mern-todo-5046.onrender.com/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(API_URL).then(res => setTasks(res.data));
  }, []);

  const addTask = async () => {
    if(!text) return;
    const res = await axios.post(API_URL, { text });
    setTasks([...tasks, res.data]);
    setText("");
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  const toggleTask = async (id, completed) => {
    const res = await axios.put(`${API_URL}/${id}`, { completed: !completed });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
  };

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h3>MERN To-Do List</h3>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type" />
      <button onClick={addTask} style={{background:"green", color:"white", marginLeft:"5px"}}>Add</button>

      <div style={{marginTop:"20px"}}>
        {tasks.map(t=>(
          <div key={t._id} style={{margin:"8px"}}>
            <input type="checkbox" checked={t.completed} onChange={()=>toggleTask(t._id, t.completed)} />
            <span style={{textDecoration: t.completed ? "line-through" : "none", margin:"0 10px"}}>{t.text}</span>
            <button onClick={()=>deleteTask(t._id)} style={{background:"red", color:"white"}}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;