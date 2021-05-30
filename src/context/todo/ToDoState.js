import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import { todoReducer } from './todoReducer';
import { TodoContext } from './todoContext';
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

export const TodoState = ({children}) => {
    const initialState = {
        todos: []
    }
    const { changeScreen } = useContext(ScreenContext);
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async title => {
        try {
            const data = await Http.post('https://rn-todo-app-4c17a-default-rtdb.europe-west1.firebasedatabase.app/todos.json', { title });
            dispatch({type: ADD_TODO, id: data.name, title});
        } catch(e) {
            showError('Что-то пошло не так... :(');
        }
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
                    onPress: async () => {
                        changeScreen(null); // выход из экрана Todo
                        try {
                            await Http.delete(`https://rn-todo-app-4c17a-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`);
                            dispatch({type: REMOVE_TODO, id});
                        } catch(e) {
                            showError('Что-то пошло не так... :(');
                        }
                        
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
            const data = await Http.get('https://rn-todo-app-4c17a-default-rtdb.europe-west1.firebasedatabase.app/todos.json');
            console.log('fetch data', data);
            const todos = data ? Object.keys(data).map(key => ({...data[key], id: key})) : [];
            dispatch({type: FETCH_TODOS, todos});
        } catch (e) {
            showError('Что-то пошло не так... :(');
        } finally {
            hideLoader();
        }
    }

    const updateTodo = async (id, title ) => {
        clearError();
        try {
            await Http.patch(`https://rn-todo-app-4c17a-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`, {title})
            dispatch({type: UPDATE_TODO, id, title})
        } catch (e) {
            showError('Что-то пошло не так... :(');
        }
    }

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