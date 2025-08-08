export const readTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/todos");
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Ошибка загрузки:", error);
  }
};

export const createTodo = async (newTodo) => {
  try {
    const todoDefault = { ...newTodo, completed: false };

    const response = await fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(todoDefault),
    });
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Ошибка при добавлении задачи:", error);
  }
};

export const updateTodo = async (todoId, todoData) => {
  try {
    let url = "http://localhost:3000/todos";
    const response = await fetch(`${url}/${todoId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error("Ошибка при изменении задачи:", error);
  }
};

export const deleteTodo = async (todoId) => {
  try {
    let url = "http://localhost:3000/todos";

    const response = await fetch(`${url}/${todoId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    "Ошибка при удалении задачи:", error;
  }
};
