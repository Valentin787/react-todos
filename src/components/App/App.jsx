import React, { Component } from "react";
import todos from "../../data/todos.json";
import Todos from "../Todos";
import s from "./App.module.css";

class App extends Component {
  render() {
    return (
      <main className={s.main}>
        <Todos todos={todos} />
      </main>
    );
  }
}

export default App;
