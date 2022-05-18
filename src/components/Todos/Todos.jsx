import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import TodoSList from "./TodosList";
import TodoFilter from "./TodoFilter/TodoFilter";
import TodoForm from "./TodoForm/TodoForm";
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
    todosArr: this.props.todos,
    filter: "",
  };

  deleteTodos = (idItem) => {
    this.setState((prevState) => ({
      todosArr: prevState.todosArr.filter(({ id }) => id !== idItem),
    }));
  };
  toggleCompleted = (idToggle) => {
    this.setState((prevState) => ({
      todosArr: prevState.todosArr.map((todo) =>
        todo.id === idToggle ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  };
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
  onCompleteTodos = () => {
    const { todosArr } = this.state;
    return todosArr.reduce(
      (acc, { completed }) => (completed ? acc + 1 : acc),
      0
    );
  };

  render() {
    const { todosArr } = this.state;

    const doneTodos = this.onCompleteTodos();
    const filterTodos = this.onFilterTodo();

    return (
      <>
        <Header length={todosArr.length} doneTodos={doneTodos} />
        <TodoFilter onChange={this.handlerFilter} />
        <TodoSList
          todosArr={filterTodos}
          onDeleteTodos={this.deleteTodos}
          onToggle={this.toggleCompleted}
        />
        <TodoForm name="name" onAddToDo={this.addTodo} />
      </>
    );
  }
}

export default Todos;
