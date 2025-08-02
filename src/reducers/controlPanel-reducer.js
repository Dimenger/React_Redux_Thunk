export const initialControlPanelState = {
  searchTerm: "",
  isAlphabetSorting: false,
};

export const controlPanelReducer = (
  state = initialControlPanelState,
  action
) => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "SET_IS_ALPHABET_SORTING":
      return { ...state, isAlphabetSorting: action.payload };
    default:
      return state;
  }
};
