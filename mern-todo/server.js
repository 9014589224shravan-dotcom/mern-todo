const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
.then(()=> console.log("MongoDB Connected - Atlas"))
.catch(err => console.log("MongoDB Error:", err));

const Task = mongoose.model("Task", {
  text: String,
  completed: Boolean,
});

app.get("/", (req,res)=> res.send("HELLO WORLD - Backend Live"));

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

app.delete("/tasks/:id", async (req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json({message:"deleted"});
});

app.listen(5000, ()=> console.log("Backend running on port 5000"));