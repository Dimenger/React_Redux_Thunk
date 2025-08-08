import { updateTodo } from "../api";

export const updateTodoAction = (id, updatedData) => {
  return async (dispatch) => {
    try {
      const response = await updateTodo(id, updatedData);
      dispatch({ type: "UPDATE_TODO", payload: { id, ...response } });
    } catch (error) {
      console.error("Ошибка при изменении задачи:", error);
    }
  };
};
