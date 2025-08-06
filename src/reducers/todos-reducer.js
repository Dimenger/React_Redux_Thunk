export const initialTodoState = {
  todos: [],
};

export const todosReducer = (state = initialTodoState, action) => {
  switch (action.type) {
    case "SET_TODOS":
      return { ...state, todos: action.payload };
    default:
      return state;
  }
};
