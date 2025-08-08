import { useState } from "react";
import styles from "./todos.module.css";

export const Todos = ({
  id,
  title,
  completed,
  handleToggleComplete,
  handleDeleteTodo,
  handleEditTodo,
}) => {
  const [edit, setEdit] = useState(false);
  const [newTitle, setNewTitle] = useState(title); // Состояние для нового названия задачи

  // Передача обрезанного текста
  const truncate = (str, maxLength = 50) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  };

  const handleChange = () => {
    handleToggleComplete(id, completed);
  };

  const handleDelete = () => {
    handleDeleteTodo(id);
  };

  const startEdit = () => {
    setEdit(true);
    if (edit) {
      setNewTitle(title); // Сбрасываем новое название на текущее при выходе из режима редактирования
    }
  };

  const handleEdit = () => {
    handleEditTodo(id, newTitle); // Передаем новое название
    setEdit(false); // Выходим из режима редактирования
  };

  return (
    <div className={styles.todoContainer}>
      <input type="checkbox" checked={completed} onChange={handleChange} />

      {edit ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)} // Обновляем состояние при изменении текста
          autoFocus
          className={styles.inputStyle}
        />
      ) : (
        truncate(title)
      )}

      <div className={styles.button_container}>
        {edit ? (
          <button type="button" onClick={handleEdit}>
            💾 {/* Иконка для сохранения */}
          </button>
        ) : (
          <div>
            <button type="button" onClick={startEdit}>
              🖉 {/* Иконка для редактирования */}
            </button>
            <button type="button" onClick={handleDelete}>
              ☠ {/* Иконка для удаления */}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
