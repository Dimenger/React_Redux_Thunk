import styles from "./add.module.css";

export const AddButton = ({ manualAdd }) => {
  return (
    <button className={styles.addButton} type="button" onClick={manualAdd}>
      ✚
    </button>
  );
};
