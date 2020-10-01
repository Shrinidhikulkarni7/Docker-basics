import React from "react";
import { useTasks } from "../context";

const TodoList = () => {
  const [isInput, setInput] = React.useState({ state: false, id: null });
  const [taskInput, setTaskInput] = React.useState("");

  const inputRef = React.useRef();

  const handleEditMode = (setInput, task) => {
    setTimeout(() => {
      setInput({ state: true, id: task.id });
      inputRef.current.focus();
    }, 100);
  };

  let { tasks, editTask, removeTask } = useTasks();

  if (!tasks) {
    return <div className="error">Error fetching your tasks...</div>;
  }

  if (tasks.length === 0) {
    return <div className="empty">Looks like you're task free!</div>;
  }

  return (
    <div className="tasks mx-auto">
      {tasks?.map((task) =>
        isInput.id !== task.id ? (
          <li className="task" key={task.id}>
            <div
              style={task.completed ? { textDecoration: "line-through" } : {}}
              onClick={() => editTask(task.id, !task.completed)}
            >
              {task.task}
            </div>
            <div className="task-controls">
              <span
                onClick={() => {
                  handleEditMode(setInput, task);
                }}
              >
                edit
              </span>
              <span onClick={() => removeTask(task.id)}>remove</span>
            </div>
          </li>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              editTask(task.id, task.completed, taskInput.trim());
              setInput({ state: false, id: null });
              setTaskInput("");
            }}
          >
            <input
              key={task.id}
              ref={inputRef}
              className="edit-task"
              type="text"
              onBlur={() => setInput({ state: false, id: null })}
              defaultValue={task.task}
              onChange={(e) => {
                setTaskInput(e.target.value);
              }}
            />
          </form>
        )
      ) ?? null}
    </div>
  );
};

export default TodoList;
