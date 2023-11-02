import React, { useState } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);

  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = () => {
    const duplicateToDoCheck = todos.filter((todo) => todo.text === newTodo)
    if(duplicateToDoCheck.length === 0){
       //For Redux Observable integration give the type as ADD_TODO_REQUEST, now redux observable is not integrated because the api call is not correct one in epic.js file. Now it is simple redux
        dispatch({ type: 'ADD_TODO', payload: {text: newTodo } }); 
        setNewTodo('');
        notification.success({
            message: 'Success',
            description: "To-do successfully in the bag, we're making it happen!",
          });
          
    }
    else{
        notification.error ({
            message: 'Error',
            description: "Duplicate to-dos are a no-go in our book, let's keep it unique!",
          });
    }
  };

  const handleRemoveTodo = (todoText) => {
    dispatch({ type: 'REMOVE_TODO', payload: todoText });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={handleAddTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => handleRemoveTodo(todo.text)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;