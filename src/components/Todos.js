import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchTodos,
  getAllTodos,
  getTodosStatus,
} from '../features/todos/todosSlice';
import Todo from './Todo';

export default function Todos() {
  const dispatch = useDispatch();
  const todos = useSelector(getAllTodos);
  const todosStatus = useSelector(getTodosStatus);

  useEffect(() => {
    console.log({ todosStatus });
    if (todosStatus === 'idle') {
      dispatch(fetchTodos({ message: 'test' }));
    }
  }, [dispatch, todosStatus]);

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <Todo todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
