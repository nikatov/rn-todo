import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import { THEME } from '../theme';

import { AntDesign } from '@expo/vector-icons';

export function AddTodo(props) {
    const [value, setValue] = useState('');

    function pressHandler() {
        if(!value.trim()) {
            Alert.alert('Название задачи не может быть пустым.');
            return;
        }
        props.onSubmit(value);
        setValue('')
    }
    return ( 
        <View style={styles.block}>
            <TextInput
                style={styles.input}
                onChangeText={text => setValue(text)}
                value={value}
                placeholder="Введите название задачи..."
                autoCorrect={false}
                autoCapitalize='none'
            />
            <AntDesign.Button
                onPress={event => pressHandler()}
                name='pluscircleo'
            >
                Добавить
            </AntDesign.Button>
            {/* <Button title="Добавить" onPress={event => pressHandler()}/> */}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '60%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        padding: 8
    }
});
