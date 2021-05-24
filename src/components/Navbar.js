import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {THEME} from '../theme';

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
        backgroundColor: THEME.MAIN_COLOR,
        padding: 8
    },
    text: {
        color: 'white',
        fontSize: 18
    }
});