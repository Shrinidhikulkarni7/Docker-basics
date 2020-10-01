const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(cors());

let router = express.Router();
app.use("/api/", router);

let tasks = [
  {
    id: 1,
    completed: true,
    task: "Learn docker",
  },
  {
    id: 2,
    completed: false,
    task: "Build a todo app",
  },
  {
    id: 3,
    completed: false,
    task: "Dockerize this todo app",
  },
];

router.get("/", (_, res) => {
  res.json(tasks);
});

router.post("/", (req, res) => {
  let { task } = req.body;
  let id = new Date().getTime().toString(36);
  tasks.push({ id, completed: false, task });
  res.json(tasks[tasks.length - 1]);
});

router.put("/:id", (req, res) => {
  let { id } = req.params;
  let { task, completed } = req.body;
  let index = tasks.findIndex((t) => t.id == id);
  if (index !== -1) {
    if (task) {
      tasks[index].task = task;
    }
    if (completed !== undefined && typeof completed === "boolean") {
      tasks[index].completed = completed;
    }
    return res.json(tasks[index]);
  }
  return res.status(400).json({ message: "failed to update task" });
});

router.delete("/:id", (req, res) => {
  let { id } = req.params;
  let index = tasks.findIndex((t) => t.id == id);
  if (index !== -1) {
    let removedTask = tasks.splice(index, 1);
    return res.json({ id: removedTask[0].id });
  }
  return res.status(400).json({ message: "Task not found" });
});

app.listen(8080, () => console.log("listening on port 8080"));
