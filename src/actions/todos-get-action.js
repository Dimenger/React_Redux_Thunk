import { readTodos } from "../api";

const setTodosChange = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});

export const todosGet = () => {
  return async (dispatch) => {
    const todoList = await readTodos();
    dispatch(setTodosChange(todoList));
  };
};
