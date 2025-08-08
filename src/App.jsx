import { useState, useEffect } from "react";
import { Todos } from "./components/todos/todos";
import { readTodos, createTodo, updateTodo, deleteTodo } from "./api";
import { ControlPanel } from "./components/control-panel/control-panel";

export const App = () => {
  const [todos, setTodos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAlphabetSorting, setIsAlphabetSorting] = useState(false);

  // Загрузка задач при монтировании компонента
  useEffect(() => {
    const fetchFun = async () => {
      try {
        const todosList = await readTodos();
        setTodos(todosList);
      } catch (error) {
        console.error("Ошибка при загрузке задач:", error);
      }
    };
    fetchFun();
  }, []);

  // Добавление задачи
  const handleAddTodo = async () => {
    try {
      let data = {};
      const title = prompt("Введите название задачи");
      if (title) {
        data = await createTodo({ title });
      }
      setTodos((prev) => [...prev, data]);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  // Обработчик изменения статуса выполнения задачи
  const handleToggleComplete = async (id, currentCompleted) => {
    try {
      await updateTodo(id, { completed: !currentCompleted });
      // Обновляем локальный список задач
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !currentCompleted } : todo
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  // Редактирование задачи
  const handleEditTodo = async (id, newTitle) => {
    try {
      if (newTitle) {
        await updateTodo(id, { title: newTitle });
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle } : todo
          )
        );
      }
    } catch (error) {
      "Ошибка редактирования задачи:", error;
    }
  };

  // Удаление задачи

  const handleDeleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!window.confirm(`Удалить задачу "${todoToDelete.title}"?`)) return;
    await deleteTodo(id);
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Поиск совпадений
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Создаем отсортированный список задач
  const sortedTodos = isAlphabetSorting
    ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
    : todos;

  // Фильтрация по поисковому запросу
  const filteredTodos = sortedTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <ControlPanel
        handleAddTodo={handleAddTodo}
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
        isSortingEnabled={isAlphabetSorting}
        onSortingToggle={(checked) => setIsAlphabetSorting(checked)}
      />
      <div>
        {filteredTodos.map(({ id, title, completed }) => (
          <Todos
            key={id}
            title={title}
            completed={completed}
            handleToggleComplete={handleToggleComplete}
            handleDeleteTodo={handleDeleteTodo}
            handleEditTodo={handleEditTodo}
            id={id}
          />
        ))}
      </div>
    </>
  );
};
