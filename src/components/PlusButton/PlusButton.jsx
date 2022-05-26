import React from "react";
import PropTypes from "prop-types";
import { BsPlusLg } from "react-icons/bs";
import s from "./PlusButton.module.css";

const PlusButton = ({ text, openAddModal }) => {
  return (
    <div className={s.wrap}>
      <button className={s.btnPlus} onClick={openAddModal}>
        <BsPlusLg />
      </button>
      <p className={s.text}>{text}</p>
    </div>
  );
};

PlusButton.propTypes = {};

export default PlusButton;
