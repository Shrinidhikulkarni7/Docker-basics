import Head from "next/head";
import TodoList from "../components/TodoList";
import { TaskProvider } from "../context";
import AddTodo from "../components/AddTodo";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Todo App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="block mx-auto">
        <TaskProvider>
          <AddTodo />
          <TodoList />
        </TaskProvider>
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Inter, Segoe UI,
            Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans,
            Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
