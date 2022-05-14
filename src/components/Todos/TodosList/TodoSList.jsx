import React from "react";
import PropTypes from "prop-types";
import { RiDeleteBack2Line } from "react-icons/ri";
import s from "./TodoSList.module.css";
import Paper from "../../Paper";

const TodoSList = ({ todosArr, onDeleteTodos }) => {
  return (
    <div className={s.list}>
      <ul>
        {todosArr.map(({ id, text, completed }) => {
          return (
            <Paper key={id}>
              <li className={s.item}>
                <p className={s.text}>{text}</p>
                <button className={s.btn} onClick={() => onDeleteTodos(id)}>
                  <RiDeleteBack2Line fontSize="30px" />
                </button>
              </li>
            </Paper>
          );
        })}
      </ul>
    </div>
  );
};

TodoSList.propTypes = {
  todosArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  onDeleteTodos: PropTypes.func,
};

export default TodoSList;
