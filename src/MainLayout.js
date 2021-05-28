import React, { useContext, useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext);
    return (
        <View>
            <Navbar title='To-Do App'/>
            <View style={styles.mainWindow}>
                {todoId ? <TodoScreen/> : <MainScreen/>}
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