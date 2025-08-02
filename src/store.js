import { createStore, applyMiddleware, combineReducers } from "redux";
import { todoReducer, controlPanelReducer } from "./reducers";
import { thunk } from "redux-thunk";

const myReducer = combineReducers({
  todoState: todoReducer,
  controlPanelState: controlPanelReducer,
});

export const store = createStore(myReducer, applyMiddleware(thunk));
