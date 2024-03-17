// src/features/todos/todosSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk action to fetch todos
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

// Async thunk action to add a todo
export const addTodo = createAsyncThunk('todos/addTodo', async (todo) => {
  const response = await axios.post('https://jsonplaceholder.typicode.com/todos', todo);
  return response.data;
});

// Async thunk action to delete a todo
export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);
  return id;
});

// Async thunk action to update a todo
export const updateTodo = createAsyncThunk('todos/updateTodo', async (todo) => {
  const response = await axios.put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, todo);
  return response.data;
});

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    entities: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    toggleTodo: (state, action) => {
      const todo = state.entities.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.entities.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.entities = state.entities.filter(todo => todo.id !== action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.entities.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.entities[index] = action.payload;
        }
      });
  },
});

export const { toggleTodo } = todosSlice.actions;

// Selectors
export const selectAllTodos = (state) => state.todos.entities;
export const selectTodoById = (state, id) =>
  state.todos.entities.find((todo) => todo.id.toString() === id);

export default todosSlice.reducer;
