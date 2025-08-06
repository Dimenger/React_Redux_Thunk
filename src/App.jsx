import { useEffect } from "react";
import { Todos } from "./components/todos/todos";
import { createTodo, updateTodo, deleteTodo } from "./api";
import { ControlPanel } from "./components/control-panel/control-panel";
import { useSelector, useDispatch } from "react-redux";
import {
  todosSelector,
  isAlphabetSortingSelector,
  searchTermSelector,
} from "./selectors";
import {
  setTodosChange,
  searchTermChange,
  isAlphabetSortingChange,
} from "./actions";

export const App = () => {
  const todos = useSelector(todosSelector);
  const searchTerm = useSelector(searchTermSelector);
  const isAlphabetSorting = useSelector(isAlphabetSortingSelector);

  const dispatch = useDispatch();

  const setSearchTerm = (searchTerm) => dispatch(searchTermChange(searchTerm));
  const setIsAlphabetSorting = (isSortingEnabled) =>
    dispatch(isAlphabetSortingChange(isSortingEnabled));

  useEffect(() => {
    dispatch(setTodosChange());
  }, [dispatch]);

  // Добавление задачи
  const handleAddTodo = async () => {
    let data = {};
    const title = prompt("Введите название задачи");
    if (title) {
      data = await createTodo({ title });
    }
    setTodosChange((prev) => [...prev, data]);
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

  // Обработчик изменения статуса выполнения задачи
  const handleToggleComplete = async (id, currentCompleted) => {
    try {
      await updateTodo(id, { completed: !currentCompleted });
      // Обновляем локальный список задач
      setTodosChange((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed: !currentCompleted } : todo
        )
      );
    } catch (error) {
      console.error("Ошибка при обновлении статуса:", error);
    }
  };

  // Удаление задачи

  const handleDeleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!window.confirm(`Удалить задачу "${todoToDelete.title}"?`)) return;
    await deleteTodo(id);
    setTodosChange((prev) => prev.filter((todo) => todo.id !== id));
  };

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
            id={id}
          />
        ))}
      </div>
    </>
  );
};
