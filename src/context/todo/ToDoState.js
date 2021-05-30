import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import { todoReducer } from './todoReducer';
import { TodoContext } from './todoContext';
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';

export const TodoState = ({children}) => {
    const initialState = {
        todos: []
    }
    const { changeScreen } = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async title => {
        const response = await fetch(
            'https://rn-todo-app-4c17a-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title })
            });
        const data = await response.json();
        // console.log('Добавление todo:', data);
        dispatch({type: ADD_TODO, id: data.name, title});
    }
    
    const removeTodo = id => {
        const todo = state.todos.find(todo => todo.id === id);
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить элемент "${todo.title}"?`,
            [
                {
                    text: 'Отмена',
                    style: 'cancel'
                },
                {
                    text: 'Удалить',
                    style: 'destructive',
                    onPress: () => {
                        changeScreen(null); // выход из экрана Todo
                        dispatch({type: REMOVE_TODO, id});
                    }
                }
            ],
            { cancelable: false }
        );
    }

    const fetchTodos = async () => {
        showLoader();
        clearError();
        try {
            const response = await fetch(
                'https://rn-todo-app-4c17a-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
                {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'}
                });
            const data = await response.json();
            // console.log('fetch data', data);
            const todos = data ? Object.keys(data).map(key => ({...data[key], id: key})) : [];
            dispatch({type: FETCH_TODOS, todos});
        } catch (e) {
            showError('Что-то пошло не так... :(');
            console.log(e);
        } finally {
            hideLoader();
        }
    }

    const updateTodo = (id, title ) => dispatch({type: UPDATE_TODO, id, title});

    const showLoader = () => dispatch({type: SHOW_LOADER});
    const hideLoader = () => dispatch({type: HIDE_LOADER});
    const showError = (error) => dispatch({type: SHOW_ERROR, error});
    const clearError = () => dispatch({type: CLEAR_ERROR});

    // В значение контекста value заносятся публичные функции, доступные извне
    return (
        <TodoContext.Provider
        value=
            {{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}