import { readTodos } from "../api";

export const setTodosChange = () => {
  return async (dispatch) => {
    try {
      const todos = await readTodos();
      return dispatch({
        type: "SET_TODOS",
        payload: todos,
      });
    } catch (error) {
      console.error("Ошибка при загрузке задач:", error);
    }
  };
};
