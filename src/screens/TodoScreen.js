import React, { useContext, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import { THEME } from '../theme';
import { AppCard } from '../ui/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../ui/AppTextBold';
import { AppButton } from '../ui/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
    const [model, setModel] = useState(false);

    const {todos, removeTodo, updateTodo} = useContext(TodoContext);
    const {todoId, changeScreen} = useContext(ScreenContext);
    const todo = todos.find(todo => todo.id == todoId);

    // async - await, чтобы дождаться завершения асинхронной функции updateTodo (обновления на сервере), прежде чем закрывать модальное окно
    const saveHandler = async title => {
        await updateTodo(todo.id, title);
        setModel(false);
    }

    return (
        <View>
            <EditModal
                value={todo.title}
                visible={model}
                onClose={() => setModel(false)}
                onSave={saveHandler}
            />
            <AppCard style={styles.card}>
                <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                <AppButton
                    onPress={() => setModel(true)}
                >
                    <FontAwesome name='edit' size={20}/>
                </AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.GRAY_COLOR}
                        onPress={() => changeScreen(null)}
                    >
                        <AntDesign name='back' size={20} color="#fff"/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => removeTodo(todo.id)}
                    >
                        <FontAwesome name='remove' size={20} color="#fff"/>
                    </AppButton>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card: {
        marginBottom: 20,
        padding: 15
    },
    button: {
        // width: Dimensions.get('window').width * 0.4 // 40%
        width: Dimensions.get('window').width > 400 ? 150 : 100
    },
    title: {
        fontSize: 20
    }
});