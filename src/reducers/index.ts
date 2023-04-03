import { combineReducers } from "@reduxjs/toolkit";
import { todosReducer } from "./todos";
import { Todo } from "../actions";

export interface StoreState {
  todos: Todo[];
}

export const reducers = combineReducers({
  todos: todosReducer,
});
