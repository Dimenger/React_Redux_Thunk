import { createTodo } from "../api";

export const todoAdd = () => {
  return async (dispatch) => {
    try {
      const title = prompt("Введите название задачи");
      if (title) {
        const newTodo = await createTodo({ title });
        dispatch({ type: "ADD_TODO", payload: newTodo });
      }
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };
};
