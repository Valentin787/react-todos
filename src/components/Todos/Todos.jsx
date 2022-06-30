import { useState, useEffect, useMemo } from "react";

import PropTypes from "prop-types";
import * as api from "../../utils/api";
import Header from "./Header";
import TodoSList from "./TodosList";
import TodoFilter from "./TodoFilter";
import TodoForm from "./TodoForm";
import Modal from "../Modal";
import PlusButton from "../PlusButton";
import { toast } from "react-toastify";
import HashLoader from "react-spinners/HashLoader";
import s from "./Todos.module.css";

var shortid = require("shortid");

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#08f59a",
};

const API_ENDPOINT = "todos";

const Todos = () => {
  const [todosArr, setTodosArr] = useState([]);
  const [newTodo, setNewTodo] = useState(null);
  const [deleteID, setDeleteID] = useState("");
  const [filter, setFilter] = useState("");
  const [isOpenModalAdd, setIsOpenModalAdd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [color, setColor] = useState("#14da8e");

  useEffect(() => {
    setError(null);

    const setTransactions = async () => {
      setLoading(true);
      try {
        const todos = await api.getTodo("todos");
        setTodosArr(todos);
        setLoading(false);
      } catch (error) {
        setError(error.message);
      }
    };
    setTransactions();
  }, []);

  // ADD TODO

  const confirmTodo = (todo) => setNewTodo(todo);

  useEffect(() => {
    if (!newTodo) return;
    setLoading(true);

    api
      .postTodo(API_ENDPOINT, newTodo)
      .then((item) => {
        setTodosArr((prevTodos) => [item, ...prevTodos]);
        toast.success("Завдання успішно збережено в списку 👌 !");
        toast.info("За работу 👊 !");
      })
      .catch((error) => {
        toast.error("Завдання не додано (: Спробуйте ще раз 🙌");
        return error.message;
      })
      .finally(() => {
        setNewTodo(null);
        setLoading(false);
      });
  }, [newTodo]);

  // OPEN MODAL
  const openAddModal = () => setIsOpenModalAdd(true);

  // CLOSE MODAL
  const closeAddModal = () => setIsOpenModalAdd(false);

  const onCompleteTodos = () => {
    return todosArr.reduce(
      (acc, { completed }) => (completed ? acc + 1 : acc),
      0
    );
  };

  // TOGGLE

  const toggleCompleted = (idToggle) => {
    setTodosArr((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === idToggle ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // FILTER
  const handlerFilter = (e) => setFilter(e.target.value);

  const onFilterTodo = useMemo(() => {
    const normalize = filter.toLowerCase();
    const finalArray = todosArr.filter((item) =>
      item.text.toLowerCase().includes(normalize)
    );
    if (finalArray.length === 0 && filter !== "") {
      toast.warn("Warning Notification !");
    }
    return finalArray;
  }, [filter, todosArr]);

  // DELETE

  const deleteTodos = (idItem) => setDeleteID(idItem);

  useEffect(() => {
    if (deleteID === "") return;
    setLoading(true);
    api
      .deleteTodo(API_ENDPOINT, deleteID)
      .then((item) => {
        setTodosArr((prevTodos) =>
          prevTodos.filter(({ id }) => id !== deleteID)
        );
        toast.success("Завдання виконане і видалено 👌 !");
        toast.info("Ти молодець 👊 !");
      })
      .catch((error) => {
        toast.error("Завдання не видалено (: Спробуйте ще раз 🙌");
        return error.message;
      })
      .finally(() => {
        setDeleteID("");
        setLoading(false);
      });
  }, [deleteID]);

  const doneTodos = onCompleteTodos();
  // const filterTodos = onFilterTodo();

  return (
    <>
      {loading && (
        <div className={s.wrap}>
          <HashLoader
            color={color}
            loading={loading}
            cssOverride={override}
            size={80}
          />
        </div>
      )}

      <Header length={todosArr.length} doneTodos={doneTodos} />
      {!isOpenModalAdd && (
        <PlusButton
          text=" <<-- Ще одне завдання ...?"
          openAddModal={openAddModal}
        />
      )}
      {isOpenModalAdd && (
        <Modal onCloseAddModal={closeAddModal}>
          <TodoForm
            name="name"
            onAddToDo={confirmTodo}
            onCloseAddModal={closeAddModal}
          />
        </Modal>
      )}

      <TodoFilter onChange={handlerFilter} />
      <TodoSList
        todosArr={onFilterTodo}
        onDeleteTodos={deleteTodos}
        onToggle={toggleCompleted}
      />
    </>
  );
};

Todos.propTypes = {
  todosArr: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
};

export default Todos;
