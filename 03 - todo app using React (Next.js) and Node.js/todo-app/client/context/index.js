import { useState, useReducer, createContext, useContext } from "react";
import { fetcher } from "../components/utils/fetcher";

const todoContext = createContext();

export const TaskProvider = ({ children }) => {
  const value = useTaskValue();
  return <todoContext.Provider value={value}>{children}</todoContext.Provider>;
};

export const useTaskValue = () => {
  let [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  React.useEffect(() => {
    (async () => {
      let tasks = await fetcher("http://localhost:8080/api/");
      setTasks([...tasks]);
    })();
  }, []);

  const addTask = async (task) => {
    let newTask = await fetcher("http://localhost:8080/api/", "POST", { task });
    if (newTask.id) {
      setTasks([...tasks, newTask]);
    } else {
      setError("Failed to create task");
    }
  };

  const editTask = async (id, completed = undefined, task = undefined) => {
    let editedTask = await fetcher("http://localhost:8080/api/" + id, "PUT", {
      task,
      completed,
    });
    if (editedTask.id) {
      tasks = tasks.map((task) =>
        task.id === editedTask.id ? editedTask : task
      );
      setTasks([...tasks]);
    } else {
      setError("Failed to edit task");
    }
  };

  const removeTask = async (id) => {
    let deletedTask = await fetcher(
      "http://localhost:8080/api/" + id,
      "DELETE"
    );
    if (deletedTask.id) {
      tasks = tasks.filter((task) => task.id !== deletedTask.id);
      setTasks([...tasks]);
    } else {
      setError("Failed to delete task");
    }
  };

  return {
    tasks,
    addTask,
    error,
    editTask,
    removeTask,
  };
};

export const useTasks = () => {
  return useContext(todoContext);
};
