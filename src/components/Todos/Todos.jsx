import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import TodoSList from "./TodosList";

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
  };

  deleteTodos = (idItem) => {
    this.setState((prevState) => ({
      todosArr: prevState.todosArr.filter(({ id }) => id !== idItem),
    }));
  };

  render() {
    const { todosArr } = this.state;
    const doneTodos = todosArr.reduce(
      (acc, { completed }) => (completed ? acc + 1 : acc),
      0
    );

    return (
      <>
        <Header length={todosArr.length} doneTodos={doneTodos} />
        <TodoSList todosArr={todosArr} onDeleteTodos={this.deleteTodos} />
      </>
    );
  }
}

export default Todos;
