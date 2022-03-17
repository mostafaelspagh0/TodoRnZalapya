import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

const initialState: TodoState = {
  todos: [],
  lastId: 0,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({
        id: state.lastId + 1,
        title: action.payload,
        done: false,
      });
      state.lastId = state.lastId + 1;
    },
    deleteTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    markTodoDone: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.done = !todo.done;
      }
    },
  },
});



export const { addTodo, deleteTodo, markTodoDone } = todoSlice.actions;
export const selectTodo = (state: RootState) => state.todos;

export default todoSlice.reducer;
