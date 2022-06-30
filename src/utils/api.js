import axios from "axios";

axios.defaults.baseURL = "http://localhost:3004/";

const postTodo = async (endPoint, newTodo) => {
  try {
    const { data } = await axios.post(endPoint, newTodo);
    return data;
  } catch (error) {
    throw error;
  }
};

const getTodo = async (endPoint) => {
  try {
    const { data } = await axios.get(endPoint);
    return data;
  } catch (error) {
    throw error;
  }
};
const deleteTodo = async (endPoint, id) => {
  try {
    const { data } = await axios.delete(`${endPoint}/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { postTodo, getTodo, deleteTodo };
