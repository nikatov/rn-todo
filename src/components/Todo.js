import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export function Todo({todo, onOpen, onRemove}) {
    console.log(todo);
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onLongPress={() => onRemove(todo.id)}
            onPress={() => onOpen(todo.id)}
        >
            <View style={styles.todo}>
                <Text>{todo.title}</Text>
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