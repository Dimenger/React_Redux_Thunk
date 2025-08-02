import { readTodos, updateTodo } from "../api";

const setTodosChange = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});

export const todoStatusChange = (id, currentCompleted) => {
  return async (dispatch) => {
    try {
      await updateTodo(id, { completed: !currentCompleted });
      const todoList = await readTodos();
      dispatch(setTodosChange(todoList));
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };
};
