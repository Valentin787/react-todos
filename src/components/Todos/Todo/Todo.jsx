import React from "react";
import PropTypes from "prop-types";
import { RiDeleteBack2Line } from "react-icons/ri";
import s from "./Todo.module.css";

const Todo = ({ text, completed, onToggle, onDeleteTodos }) => {
  return (
    <>
      <input
        className={s.checkbox}
        type="checkbox"
        checked={completed}
        onChange={onToggle}
      />
      <p className={completed ? s.text__Completed : s.text}>{text}</p>
      <button className={s.btn} onClick={onDeleteTodos}>
        <RiDeleteBack2Line fontSize="30px" />
      </button>
    </>
  );
};

Todo.propTypes = {
  text: PropTypes.string,
  completed: PropTypes.bool,
  onToggle: PropTypes.func,
  onDeleteTodos: PropTypes.func,
};

export default Todo;
