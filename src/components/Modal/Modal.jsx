import { useEffect } from "react";
import { useLockBodyScroll } from "react-use";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import s from "./Modal.module.css";
import { CgClose } from "react-icons/cg";

const modalRoot = document.querySelector("#modal-root");

const Modal = ({ onCloseAddModal, children }) => {
  useLockBodyScroll(true);

  useEffect(() => {
    const handlerKeyDown = (e) => {
      if (e.code === "Escape") {
        onCloseAddModal();
      }
    };

    window.addEventListener("keydown", handlerKeyDown);

    return () => {
      window.removeEventListener("keydown", handlerKeyDown);
    };
  }, [onCloseAddModal]);

  // componentDidMount() {
  //   window.addEventListener("keydown", this.handlerKeyDown);
  // }

  // componentWillUnmount() {
  //   window.removeEventListener("keydown", this.handlerKeyDown);
  // }

  const handlerBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCloseAddModal();
    }
  };
  return createPortal(
    <div onClick={handlerBackdropClick} className={s.backdrop}>
      <div className={s.modal}>
        <button onClick={onCloseAddModal} className={s.btnClose}>
          <CgClose />
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  onCloseAddModal: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;

// class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener("keydown", this.handlerKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener("keydown", this.handlerKeyDown);
//   }

//   handlerKeyDown = (e) => {
//     if (e.code === "Escape") {
//       this.props.onCloseAddModal();
//     }
//   };
//   handlerBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       this.props.onCloseAddModal();
//     }
//   };

//   // RENDER
//   render() {
//     const { onCloseAddModal, children } = this.props;

//     return createPortal(
//       <div onClick={this.handlerBackdropClick} className={s.backdrop}>
//         <div className={s.modal}>
//           <button onClick={onCloseAddModal} className={s.btnClose}>
//             <CgClose />
//           </button>
//           {children}
//         </div>
//       </div>,
//       modalRoot
//     );
//   }
// }

// Modal.propTypes = {
//   onCloseAddModal: PropTypes.func,
//   children: PropTypes.node,
// };

// export default Modal;
