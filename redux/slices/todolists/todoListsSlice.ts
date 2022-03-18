import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

const initialState: todoLists = {
  todoLists: [
    {
      lastId: 0,
      listId: 0,
      listName: '',
      todos: []
    }
  ],
  lastListId: 0
}

export const todoListsSlice = createSlice({
  name: 'todoLists',
  initialState,
  reducers: {
    addTodoList: (state, action: PayloadAction<string>) => {
      state.todoLists.push({
        todos: [],
        lastId: 0,
        listId: state.lastListId + 1,
        listName: action.payload
      })
      state.lastListId = state.lastListId + 1
    },
    deleteTodoList: (state, action: PayloadAction<number>) => {
      state.todoLists = state.todoLists.filter(
        todoList => todoList.listId !== action.payload
      )
    },
    addTodo: (
      state,
      action: PayloadAction<{ listId: number; title: string }>
    ) => {
      const todoList = state.todoLists.find(
        todoList => todoList.listId === action.payload.listId
      )
      if (todoList) {
        todoList.todos.push({
          id: todoList.lastId + 1,
          title: action.payload.title,
          done: false
        })
        todoList.lastId = todoList.lastId + 1
      }
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ listId: number; todoId: number }>
    ) => {
      const todoList = state.todoLists.find(
        todoList => todoList.listId === action.payload.listId
      )
      if (todoList) {
        todoList.todos = todoList.todos.filter(
          todo => todo.id !== action.payload.todoId
        )
      }
    },
    toggleTodoDone: (
      state,
      action: PayloadAction<{ listId: number; todoId: number }>
    ) => {
      const todoList = state.todoLists.find(
        todoList => todoList.listId === action.payload.listId
      )
      if (todoList) {
        const todo = todoList.todos.find(
          todo => todo.id === action.payload.todoId
        )
        if (todo) {
          todo.done = !todo.done
        }
      }
    }
  }
})

export const {
  addTodoList,
  deleteTodoList,
  addTodo,
  deleteTodo,
  toggleTodoDone
} = todoListsSlice.actions
export const selectTodoLists = (state: RootState) => state.todos
export const selectTodoListWithId = (todoListId: number) => {
  return (state: RootState) => {
    const todoList = state.todos.todoLists.find(
      todoList => todoList.listId === todoListId
    )
    if (todoList) {
      return todoList
    }
    throw new Error('TodoList not found')
  }
}

export default todoListsSlice.reducer
