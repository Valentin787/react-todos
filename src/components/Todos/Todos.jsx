import React, { Component } from "react";

import PropTypes from "prop-types";
import Header from "./Header";
import TodoSList from "./TodosList";
import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";
import Modal from "../Modal";
import PlusButton from "../PlusButton";
var shortid = require("shortid");

class Todos extends Component {
  static propTypes = {
    todosArr: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
      })
    ),
  };

  state = {
    todosArr: [],
    filter: "",
    isOpenModalAdd: false,
  };

  // COMPONENT/DID/MOUNT
  componentDidMount() {
    const todos = localStorage.getItem("todos");
    const parseTodos = JSON.parse(todos);
    console.log(parseTodos);
    if (parseTodos) {
      this.setState({ todosArr: parseTodos });
    }
  }

  // COMPONENT/DID/UPDATE

  componentDidUpdate(prevProps, prevState) {
    const { todosArr } = this.state;

    if (prevState.todosArr !== todosArr) {
      return localStorage.setItem("todos", JSON.stringify(todosArr));
    }
  }

  // ADD TODO

  addTodo = (text) => {
    const todo = {
      completed: false,
      id: `id-${shortid.generate()}`,
      text: text,
    };

    this.setState((prevstate) => ({
      todosArr: [todo, ...prevstate.todosArr],
    }));
  };

  // OPEN MODAL
  openAddModal = () => this.setState({ isOpenModalAdd: true });

  // CLOSE MODAL
  closeAddModal = () => this.setState({ isOpenModalAdd: false });

  onCompleteTodos = () => {
    const { todosArr } = this.state;
    return todosArr.reduce(
      (acc, { completed }) => (completed ? acc + 1 : acc),
      0
    );
  };

  // TOGGLE

  toggleCompleted = (idToggle) => {
    this.setState((prevState) => ({
      todosArr: prevState.todosArr.map((todo) =>
        todo.id === idToggle ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };

  // FILTER
  handlerFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  onFilterTodo = () => {
    const { todosArr, filter } = this.state;
    const normalize = filter.toLowerCase();
    return todosArr.filter((item) =>
      item.text.toLowerCase().includes(normalize)
    );
  };

  // DELETE

  deleteTodos = (idItem) => {
    this.setState((prevState) => ({
      todosArr: prevState.todosArr.filter(({ id }) => id !== idItem),
    }));
  };

  render() {
    const { todosArr, isOpenModalAdd } = this.state;

    const doneTodos = this.onCompleteTodos();
    const filterTodos = this.onFilterTodo();

    return (
      <>
        <Header length={todosArr.length} doneTodos={doneTodos} />
        {!isOpenModalAdd && (
          <PlusButton
            text=" <<-- Ще одне завдання ...?"
            openAddModal={this.openAddModal}
          />
        )}
        {isOpenModalAdd && (
          <Modal onCloseAddModal={this.closeAddModal}>
            <TodoForm
              name="name"
              onAddToDo={this.addTodo}
              onCloseAddModal={this.closeAddModal}
            />
          </Modal>
        )}

        <TodoFilter onChange={this.handlerFilter} />
        <TodoSList
          todosArr={filterTodos}
          onDeleteTodos={this.deleteTodos}
          onToggle={this.toggleCompleted}
        />

        {/* <TodoForm name="name" onAddToDo={this.addTodo} /> */}
      </>
    );
  }
}

export default Todos;
