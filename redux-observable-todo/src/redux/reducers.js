import { combineReducers } from 'redux';

const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.text !== action.payload),
      };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  todos: todoReducer,
});
