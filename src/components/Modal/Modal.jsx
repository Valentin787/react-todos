import React, { Component } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import s from "./Modal.module.css";
import { CgClose } from "react-icons/cg";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handlerKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handlerKeyDown);
  }

  componentDidUpdate(prevProps, prevState) {}

  handlerKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onCloseAddModal();
    }
  };
  handlerBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onCloseAddModal();
    }
  };

  // RENDER
  render() {
    const { onCloseAddModal, children } = this.props;

    return createPortal(
      <div onClick={this.handlerBackdropClick} className={s.backdrop}>
        <div className={s.modal}>
          <button onClick={onCloseAddModal} className={s.btnClose}>
            <CgClose />
          </button>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  onCloseAddModal: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
