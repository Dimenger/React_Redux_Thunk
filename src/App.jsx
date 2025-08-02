import { useEffect } from "react";
import { Todos } from "./components/todos/todos";
import { ControlPanel } from "./components/control-panel/control-panel";
import { useDispatch, useSelector } from "react-redux";
import {
  todosSelector,
  isAlphabetSortingSelector,
  searchTermSelector,
} from "./selectors";

import {
  todosChange,
  searchTermChange,
  isAlphabetSortingChange,
  todoStatusChange,
  todoDelete,
  todoAdd,
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
    dispatch(todosChange());
  }, [dispatch]);

  // Добавление задачи - асинхронный экшен для добавления
  const handleAddTodo = async () => {
    dispatch(todoAdd());
  };

  // Удаление задачи - асинхронный экшен для удаления
  const handleDeleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!window.confirm(`Удалить задачу "${todoToDelete.title}"?`)) return;
    dispatch(todoDelete(id));
  };

  // Обработчик изменения статуса выполнения задачи - асинхронный экшен для изменения статуса
  const handleToggleComplete = (id, currentCompleted) => {
    dispatch(todoStatusChange(id, currentCompleted));
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
            id={id}
          />
        ))}
      </div>
    </>
  );
};
