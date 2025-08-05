import { createTodo } from "../api";

export const todoAdd = (title) => {
  return async (dispatch) => {
    try {
      const newTodo = await createTodo(title);
      dispatch({ type: "ADD_TODO", payload: newTodo });
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };
};
