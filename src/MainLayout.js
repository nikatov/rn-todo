import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext);
    return (
        <View style={styles.wrapper}>
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
        paddingVertical: 8,
        flex: 1
    },
    wrapper: {
        flex: 1
    }
  });