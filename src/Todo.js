import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export function Todo(props) {
    console.log(props);
    console.log(props.todo);
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onLongPress={() => props.onRemove(props.todo.id)}
        >
            <View style={styles.todo}>
                <Text>{props.todo.title}</Text>
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