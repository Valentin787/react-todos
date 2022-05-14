import React from "react";
import PropTypes from "prop-types";
import s from "./Paper.module.css";

const Paper = ({ children }) => (
  <section className={s.container}>{children}</section>
);

Paper.propTypes = {
  children: PropTypes.node,
};

export default Paper;
