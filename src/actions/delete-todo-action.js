import { deleteTodo } from "../api";

export const deleteTodoAction = (id) => {
  return async (dispatch) => {
    try {
      await deleteTodo(id);
      dispatch({ type: "DELETE_TODO", payload: id });
    } catch (error) {
      console.error("Ошибка при удалении задачи:", error);
    }
  };
};
