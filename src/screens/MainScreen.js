import React, { useState, useEffect, useContext, useCallback} from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions } from 'react-native';

import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todoContext';
import { THEME } from '../theme';
import { AppButton } from '../ui/AppButton';
import { AppLoader } from '../ui/AppLoader';
import { AppText } from '../ui/AppText';


export const MainScreen = () => {
    const { todos, fetchTodos, addTodo, removeTodo, loading, error } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL);

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);
    useEffect(() => {
        loadTodos();
    }, []);

    useEffect(() => {
        const update = () => {
            const width = Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL;
            setDeviceWidth(width);
        }
        Dimensions.addEventListener('change', update);
        return () => {
            Dimensions.removeEventListener('change', update);
        }
    });

    if (loading) {
        return <AppLoader />
    }

    if (error) {
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadTodos}>Повторить</AppButton>
            </View>
        );
    }

    let content =
        <View style={{width: deviceWidth}}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item}) => {
                    return (
                        <Todo
                            todo={item}
                            onRemove={removeTodo}
                            onOpen={changeScreen}
                        />
                        );
                    }}
            />
        </View>
    if (todos.length === 0) {
        content =
            <View style={styles.imgWrap}>
                <Image
                    style={styles.img}
                    source={require('../../assets/no_one.jpg')}
                />
            </View>
    }
    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    );
}

const styles = StyleSheet.create({
    imgWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
});