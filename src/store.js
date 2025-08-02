import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { todoReducer, controlPanelReducer } from "./reducers";
import { thunk } from "redux-thunk";

const myReducer = combineReducers({
  todoState: todoReducer,
  controlPanelState: controlPanelReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  myReducer,
  composeEnhancers(applyMiddleware(thunk))
);
