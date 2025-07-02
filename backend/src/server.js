const express = require("express");
const cors = require("cors");
const repository = require("./repository/todo");
const todoService = require("./service/todo")(repository);

const server = () => {
  const server = express();
  server.use(express.json());
  server.use(cors());

  server.get("/api/todo", async (req, res) => {
    try {
      const todos = await todoService.getTodos();
      // Todos in object
      res.json({ todos });
    } catch (err) {
      // Log error
      console.error("Error fetching todos:", err);

      // Server Error and error message
      res.status(500).json({ error: "Failed to fetch todos" });
    }
  });

  server.post("/api/todo", async (req, res) => {
    try {
      const { task } = req.body;

      // Validate that task exists and is a string
      if (!task || typeof task !== "string") {
        // Respond with Bad Request if fails
        return res
          .status(400)
          .json({ error: "Task is required and must be a string." });
      }

      // Add the new todo via the service
      await todoService.addTodo({ task });

      // Fetch updated list of todos after adding
      const todos = await todoService.getTodos();

      // Respond Create and updated todos
      res.status(201).json({ todos });
    } catch (err) {
      // Log error for debugging
      console.error("Error adding todo:", err);
      // Internal Server Error and error message
      res.status(500).json({ error: "Failed to add todo" });
    }
  });

  return server;
};
module.exports = server;
