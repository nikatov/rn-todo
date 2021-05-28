import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

export const todoReducer = (state, action) => {
    switch (action.type) {
        case ADD_TODO: {
            const newTodo = {
                id: Date.now().toString(),
                title: action.title
              };
            return {...state, todos: [...state.todos, newTodo] }
        }
        case REMOVE_TODO:
            return {...state, todos: state.todos.filter(todo => todo.id !== action.id)}
        case UPDATE_TODO:
            return {...state, todos: state.todos.map(todo => {
                if (todo.id === action.id) {
                    todo.title = action.title;
                }
                return todo;
            })}
        default:
            break;
    }
    return state;
}