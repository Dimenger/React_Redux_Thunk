export const readTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/todos");
    if (!response.ok) {
      throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
  }
};

export const createTodo = async (newTodo) => {
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
};

export const updateTodo = async (todoId, todoData) => {
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
};

export const deleteTodo = async (todoId) => {
  let url = "http://localhost:3000/todos";

  const response = await fetch(`${url}/${todoId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  }
  return response.json();
};
