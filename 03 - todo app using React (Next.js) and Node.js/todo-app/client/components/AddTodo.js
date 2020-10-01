import React from "react";
import { useTasks } from "../context";

const AddTodo = () => {
  const [taskInput, setTaskInput] = React.useState("");
  const { addTask } = useTasks();

  const handleTaskCreation = async (e) => {
    e.preventDefault();
    if (!taskInput.trim()) {
      return;
    }
    addTask(taskInput.trim());
    setTaskInput("");
  };

  return (
    <form onSubmit={handleTaskCreation}>
      <input
        className="new-task"
        type="text"
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
        name="task"
        placeholder="Add your new task here and press enter"
      />
    </form>
  );
};

export default AddTodo;
