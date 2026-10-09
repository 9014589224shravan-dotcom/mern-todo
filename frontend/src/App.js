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

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h3>MERN To-Do List</h3>
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={addTask} style={{background:"green", color:"white", marginLeft:"5px"}}>Add</button>
      <div>
        {tasks.map(t=><div key={t._id}>{t.text}</div>)}
      </div>
    </div>
  );
}
export default App;