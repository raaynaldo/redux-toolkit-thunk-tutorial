import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

const baseUrl = process.env.REACT_APP_API_URL;

export const fetchTodos = createAsyncThunk(
  'todos/fetchPosts',
  async (_, thunkAPI) => {
    const response = await fetch(`${baseUrl}/todos`);
    if (response.ok) {
      const todos = await response.json();
      return todos;
    }

    return thunkAPI.rejectWithValue(response.statusText);
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: uuid(),
        text: action.payload,
      };

      return [...state, todo];
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;

      const todo = state.find((todo) => todo.id === id);
      todo.text = text;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      console.log('loading');
      state.status = 'loading';
    },
    [fetchTodos.fulfilled]: (state, action) => {
      console.log('succeeded');
      state.status = 'succeeded';
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: (state, action) => {
      console.log('error');
      state.status = 'error';
      state.error = action.payload;
    },
  },
});

export const getAllTodos = (state) => state.todos.todos;
export const getTodosStatus = (state) => state.todos.status;
export const getPostError = (state) => state.todos.error;

export const { addTodo, updateTodo, deleteTodo } = todosSlice.actions;

export default todosSlice.reducer;
