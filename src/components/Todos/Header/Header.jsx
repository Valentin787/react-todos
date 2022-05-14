import React from "react";
import PropTypes from "prop-types";
import s from "./Header.module.css";

const Header = ({ length, doneTodos }) => {
  return (
    <header className={s.header}>
      <p>
        You've got <span className={s.numbers}>{length}</span> things to do
      </p>
      <p>
        Done <span className={s.numbers}> {doneTodos} </span>{" "}
      </p>
    </header>
  );
};

Header.propTypes = {
  length: PropTypes.number,
  doneTodos: PropTypes.number,
};

export default Header;
