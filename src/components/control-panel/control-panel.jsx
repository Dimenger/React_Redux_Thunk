import { AddButton } from "./add/add";
import { SearchButton } from "./search/search";
import { SortButton } from "./sort/sort";
import styles from "./control-panel.module.css";

export const ControlPanel = ({
  handleAddTodo,
  isSortingEnabled,
  onSortingToggle,
  searchTerm,
  handleSearchChange,
}) => {
  return (
    <div className={styles.controlPanel}>
      {" "}
      <SearchButton
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />{" "}
      <SortButton
        isSortingEnabled={isSortingEnabled}
        onSortingToggle={onSortingToggle}
      />
      <AddButton manualAdd={handleAddTodo} />
    </div>
  );
};
