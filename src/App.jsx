import { useEffect } from "react";
import { Todos } from "./components/todos/todos";
import { ControlPanel } from "./components/control-panel/control-panel";
import { useSelector, useDispatch } from "react-redux";
import {
  todosSelector,
  searchTermSelectore,
  isAlphabetSortingSelector,
} from "./selectors";

import {
  updateTodoAction,
  deleteTodoAction,
  todoAdd,
  setTodosAction,
  setSearchTermAction,
  setisAlphabetSortingAction,
} from "./actions";

export const App = () => {
  const todos = useSelector(todosSelector);
  const searchTerm = useSelector(searchTermSelectore);
  const isAlphabetSorting = useSelector(isAlphabetSortingSelector);

  const dispatch = useDispatch();

  const setSearchTerm = (searchTerm) =>
    dispatch(setSearchTermAction(searchTerm));
  const setIsAlphabetSorting = (todos) =>
    dispatch(setisAlphabetSortingAction(todos));

  // Загрузка задач при монтировании компонента
  useEffect(() => {
    dispatch(setTodosAction());
  }, [dispatch]);

  // Добавление задачи - асинхронный экшен для добавления
  const handleAddTodo = async () => {
    dispatch(todoAdd());
  };

  // Обработчик изменения статуса выполнения задачи
  const handleToggleComplete = async (id, currentCompleted) => {
    dispatch(updateTodoAction(id, { completed: !currentCompleted }));
  };

  // Редактирование задачи
  const handleEditTodo = async (id, newTitle) => {
    dispatch(updateTodoAction(id, { title: newTitle }));
  };

  // Удаление задачи
  const handleDeleteTodo = async (id) => {
    const todoToDelete = todos.find((todo) => todo.id === id);
    if (!window.confirm(`Удалить задачу "${todoToDelete.title}"?`)) return;
    dispatch(deleteTodoAction(id));
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
