import React from 'react';
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AppText } from '../ui/AppText';

export function Todo({todo, onOpen, onRemove}) {
    // console.log('отрисовка todo:', todo);
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onLongPress={() => onRemove(todo.id)}
            onPress={() => onOpen(todo.id)}
        >
            <View style={styles.todo}>
                <AppText>
                    {todo.title}
                </AppText>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
    }
});