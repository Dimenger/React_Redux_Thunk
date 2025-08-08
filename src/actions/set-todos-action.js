import { readTodos } from "../api";

const setTodos = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});

export const setTodosAction = () => {
  return async (dispatch) => {
    try {
      const todoList = await readTodos();
      dispatch(setTodos(todoList));
    } catch (error) {
      console.error("Ошибка при загрузке:", error);
    }
  };
};
