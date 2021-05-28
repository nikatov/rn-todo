import React, { useReducer, useContext } from 'react';

import { todoReducer } from './todoReducer';
import { TodoContext } from './todoContext';
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';

export const TodoState = ({children}) => {
    const initialState = {
        todos: [
            {id: '1', title: 'Выучить React Native'},
            {id: '2', title: 'Написать приложение'}
        ]
    }
    const { changeScreen } = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = title => dispatch({type: ADD_TODO, title});
    const removeTodo = id => {
        changeScreen(null); // выход из экрана Todo
        dispatch({type: REMOVE_TODO, id});
    }
    const updateTodo = (id, title ) => dispatch({type: UPDATE_TODO, id, title});

    return (
        <TodoContext.Provider
        value=
            {{
                todos: state.todos,
                addTodo,
                removeTodo,
                updateTodo
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}