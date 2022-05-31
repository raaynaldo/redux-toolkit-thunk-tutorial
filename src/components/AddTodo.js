import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodoAsync } from '../features/todos/todosSlice';

export default function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const addTodoHandler = (event) => {
    event.preventDefault();
    dispatch(addTodoAsync(text));
    setText('');
  };

  return (
    <form onSubmit={addTodoHandler}>
      <input
        type='text'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button>Add todo</button>
    </form>
  );
}
