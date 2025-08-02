import { deleteTodo, readTodos } from "../api";

const setTodosChange = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});

export const todoDelete = (id) => {
  return async (dispatch) => {
    try {
      await deleteTodo(id);
      const todoList = await readTodos();
      dispatch(setTodosChange(todoList));
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };
};
