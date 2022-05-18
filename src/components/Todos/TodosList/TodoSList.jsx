import React, { Component } from "react";
import PropTypes from "prop-types";
import { RiDeleteBack2Line } from "react-icons/ri";
import s from "./TodoSList.module.css";
import Paper from "../../Paper";

class TodoSList extends Component {
  static propTypes = {
    todosArr: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        text: PropTypes.string,
        completed: PropTypes.bool,
      })
    ),
    onDeleteTodos: PropTypes.func,
    onToggle: PropTypes.func,
  };

  render() {
    const { todosArr, onDeleteTodos, onToggle } = this.props;

    return (
      <div className={s.list}>
        <ul>
          {todosArr.map(({ id, text, completed }) => {
            return (
              <Paper key={id}>
                <li className={s.item}>
                  <input
                    className={s.checkbox}
                    type="checkbox"
                    checked={completed}
                    onChange={() => onToggle(id)}
                  />
                  <p className={completed ? s.text__Completed : s.text}>
                    {text}
                  </p>
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
  }
}

// const TodoSList = ({ todosArr, onDeleteTodos,onToggle,onChange,onSubmit,name }) => {
//   return (
//     <div className={s.list}>
//       <ul>
//         {todosArr.map(({ id, text, completed }) => {
//           return (
//             <Paper key={id}>
//               <li className={s.item}>
//                 <input
//                   className={s.checkbox}
//                   type="checkbox"
//                   checked={completed}
//                   onChange={()=>onToggle(id)}
//                 />
//                 <p className={completed? s.text__Completed:s.text}>{text}</p>
//                 <button
//                   className={s.btn}
//                   onClick={() => onDeleteTodos(id)}>
//                   <RiDeleteBack2Line fontSize="30px" />
//                 </button>
//               </li>
//             </Paper>
//           );
//         })}
//       </ul>
//       <form
//         onSubmit={onSubmit}
//         className={s.form}>
//         <input
//         name={name}
//         onChange={onChange}
//         className={s.input__newTodo}
//         type="text"
//         placeholder="Мені потрібно" />
//         <button
//           className={s.btn__newTodo}
//           type="submit"> Додати </button>
//       </form>
//     </div>
//   );
// };

// TodoSList.propTypes = {
//   todosArr: PropTypes.arrayOf(
//     PropTypes.shape({
//       id: PropTypes.string.isRequired,
//       text: PropTypes.string.isRequired,
//       completed: PropTypes.bool.isRequired,
//     })
//   ),
//   onDeleteTodos: PropTypes.func,
// };

export default TodoSList;
