import { readTodos, createTodo } from "../api";

const setTodosChange = (todos) => ({
  type: "SET_TODOS",
  payload: todos,
});

export const todoAdd = () => {
  return async (dispatch) => {
    try {
      const title = prompt("Введите название задачи");
      if (title) {
        await createTodo({ title });
      }
      const todoList = await readTodos();
      dispatch(setTodosChange(todoList));
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };
};
