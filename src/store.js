import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { todosReducer, controlPanelReducer } from "./reducers";
import { thunk } from "redux-thunk";

const reducer = combineReducers({
  todoState: todosReducer,
  controlPanelState: controlPanelReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);
