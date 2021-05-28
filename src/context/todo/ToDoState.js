import React, { useReducer  } from 'react';

import { todoReducer } from './todoReducer';
import { TodoContext } from './todoContext';

export const TodoState = ({children}) => {
    const initialState = {
        todos: [
            {id: '1', title: 'Выучить React Native'},
            {id: '2', title: 'Написать приложение'}
        ]
    }
    const [state, dispatch] = useReducer(todoReducer, initialState);

    return (
        <TodoContext.Provider
        value={{
            todos: state.todos
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}