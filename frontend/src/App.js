import { useEffect, useState } from "react";
import axios from "axios";
import"./App.css";
const API_URL ="https://mern-todo-5046.onrender.com/tasks";
// For LIVE after testing, change above to:
// const API_URL = "https://mern-todo-6048.onrender.com/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
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

  return (
    <div>
      <h2>MERN To-Do List</h2>
      <input value={text} onChange={e=>setText(e.target.value)} />
      <button onClick={addTask}>Add</button>
      {tasks.map(t=>(
        <div key={t._id}>{t.text} <button onClick={()=>deleteTask(t._id)}>X</button></div>
      ))}
    </div>
  );
}
export default App;