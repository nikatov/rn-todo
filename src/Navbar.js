import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function Navbar(props) {
    return (
        <View style={styles.navbar}>
            <Text style={styles.text}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    navbar: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: '#3949ab',
        padding: 8
    },
    text: {
        color: 'white',
        fontSize: 18
    }
});