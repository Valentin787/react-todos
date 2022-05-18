import React from "react";
import PropTypes from "prop-types";
import s from "./TodoFilter.module.css";

const TodoFilter = ({ onChange }) => {
  return (
    <div className={s.filter__container}>
      <label className={s.label}>
        В пошуку ...
        <input
          // value={}
          className={s.input}
          onChange={onChange}
          type="text"
          placeholder="Введіть завдання..."
        />
      </label>
    </div>
  );
};

TodoFilter.propTypes = {
  onChange: PropTypes.func,
};

export default TodoFilter;
