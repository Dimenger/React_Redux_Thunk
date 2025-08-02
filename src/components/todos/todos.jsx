import styles from "./todos.module.css";

export const Todos = ({
  id,
  title,
  completed,
  handleToggleComplete,
  handleDeleteTodo,
}) => {
  // Передача обрезанного текста
  const truncate = (str, maxLength = 20) => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength) + "...";
  };

  const handleChange = () => {
    handleToggleComplete(id, completed);
  };

  const handleDelete = () => {
    handleDeleteTodo(id);
  };

  return (
    <>
      <div className={styles.todoContainer}>
        <input type="checkbox" checked={completed} onChange={handleChange} />
        {truncate(title)}
        <div className={styles.button_container}>
          <button type="button" onClick={handleDelete}>
            X
          </button>
        </div>
      </div>
    </>
  );
};
