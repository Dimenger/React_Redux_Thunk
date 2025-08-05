export const initialTodoState = {
  todos: [],
};

export const todoReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    case "ADD_TODO":
      return { ...state, todos: action.payload };
    case "UPDATE_TODO":
      return { ...state, todos: action.payload };
    case "DELETE_TODO":
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};

// export const initialState = {
//   todos: [],
//   searchTerm: "",
//   isAlphabetSorting: false,
// };

// export const myReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_TODOS":
//       return { ...state, todos: action.payload };
//     case "SET_SEARCH_TERM":
//       return { ...state, searchTerm: action.payload };
//     case "SET_IS_ALPHABET_SORTING":
//       return { ...state, isAlphabetSorting: action.payload };
//     default:
//       return state;
//   }
// };
