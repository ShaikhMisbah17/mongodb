const express = require("express");
const mongoose = require("./database");
const app = express();
const PORT = 3000;
app.use(express.json());
const Todo = mongoose.model(
  "Todo",
  new mongoose.Schema({
    description: String,
    completed: Boolean,
  })
);
// Get all tasks
app.get("/tasks", async (req, res) => {
  const todos = await Todo.find();
  res.status(200).json(todos);
});
// Create a new task
app.post("/tasks", async (req, res) => {
  const newTodo = new Todo({
    description: req.body.description,
    completed: req.body.completed || false,
  });
  await newTodo.save();
  res.status(201).json(newTodo);
});
// Update a task
app.put("/tasks/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!updatedTodo) {
    return res.status(404).send("Task not found.");
  }
  res.status(200).json(updatedTodo);
});
// Delete a task
app.delete("/tasks/:id", async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  if (!result) {
    return res.status(404).send("Task not found.");
  }
  res.status(204).send();
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
