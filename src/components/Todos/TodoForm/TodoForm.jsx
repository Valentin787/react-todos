import { useState } from "react";
import PropTypes from "prop-types";
import * as api from "../../../utils/api";

import s from "./TodoForm.module.css";
var shortid = require("shortid");

const TodoForm = ({ name, onAddToDo, onCloseAddModal }) => {
  const [text, setText] = useState("");

  const handleChangeTodos = (e) => setText(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const todo = {
      completed: false,
      id: `id-${shortid.generate()}`,
      text: text,
    };

    onAddToDo(todo);
    reset();
    onCloseAddModal();
  };

  const reset = () => setText("");

  return (
    <form onSubmit={onSubmit} className={s.form}>
      <input
        name={name}
        value={text}
        onChange={handleChangeTodos}
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
};

TodoForm.propTypes = {
  name: PropTypes.string,
  onAddToDo: PropTypes.func,
  onCloseAddModal: PropTypes.func,
};

export default TodoForm;

// class TodoForm extends Component {
//   // static propTypes = {
//   //   name: PropTypes.string,
//   //   onAddToDo: PropTypes.func,
//   // };

//   // state = {
//   //   text: "",
//   //   error:null,
//   // };
//   // handleChangeTodos = (e) => {
//   //   this.setState({ text: e.target.value });
//   // };

//   // onSubmit = (e) => {
//   //   e.preventDefault();
//   //   const { onAddToDo, onCloseAddModal } = this.props;
//   //   const { text } = this.state;

//   //   // api
//   //   //   .postTransactions(text)
//   //   //   .then((text) => onAddToDo({ text }))
//   //   //   .catch((error) => this.setState({ error:error })
//   //     onAddToDo(text);
//   //   this.reset();
//   //   onCloseAddModal();
//   // };

//   // reset = () => {
//   //   this.setState({ text: "" });
//   // };

//   render() {
//     const { name } = this.props;
//     const { text } = this.state;

//     return (
//       <form onSubmit={this.onSubmit} className={s.form}>
//         <input
//           name={name}
//           value={text}
//           onChange={this.handleChangeTodos}
//           className={s.input__newTodo}
//           type="text"
//           placeholder="Мені потрібно..."
//         />
//         <button className={s.btn__newTodo} type="submit">
//           {" "}
//           Додати{" "}
//         </button>
//       </form>
//     );
//   }
// }

// export default TodoForm;
