import React, { Component } from "react";
import PropTypes from "prop-types";
import s from "./TodoForm.module.css";

class TodoForm extends Component {
  static propTypes = {
    name: PropTypes.string,
    onAddToDo: PropTypes.func,
  };

  state = {
    text: "",
  };
  handleChangeTodos = (e) => {
    this.setState({ text: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { onAddToDo } = this.props;
    const { text } = this.state;

    onAddToDo(text);

    this.reset();
  };

  reset = () => {
    this.setState({ text: "" });
  };

  render() {
    const { name } = this.props;
    const { text } = this.state;

    return (
      <form onSubmit={this.onSubmit} className={s.form}>
        <input
          name={name}
          value={text}
          onChange={this.handleChangeTodos}
          className={s.input__newTodo}
          type="text"
          placeholder="Мені потрібно..."
        />
        <button className={s.btn__newTodo} type="submit">
          {" "}
          Додати{" "}
        </button>
      </form>
    );
  }
}

export default TodoForm;
