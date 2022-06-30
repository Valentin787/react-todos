import React from "react";
import todos from "../../data/todos.json";
import Todos from "../Todos";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import s from "./App.module.css";

const App = () => {
  return (
    <main className={s.main}>
      <Todos todos={todos} />
      <ToastContainer theme={"colored"} autoClose={2000} />
    </main>
  );
};

export default App;
