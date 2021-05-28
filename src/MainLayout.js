import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const {todos, addTodo, removeTodo, updateTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);

    let content =
        <MainScreen
            todos={todos}
            addTodo={addTodo}
            removeTodo={removeTodo}
            openTodo={changeScreen}
        />
    
    if (todoId) {
        const selectedTodo = todos.find(todo => todo.id == todoId);
        content =
            <TodoScreen
                goBack={() => changeScreen(null)}
                todo={selectedTodo}
                onRemove={removeTodo}
                onSave={updateTodo}
            />
    }

    return (
        <View>
            <Navbar title='To-Do App'/>
            <View style={styles.mainWindow}>
                {content}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    mainWindow: {
        paddingHorizontal: THEME.PADDING_HORIZONTAL,
        paddingVertical: 8
    }
  });