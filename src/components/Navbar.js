import React from 'react';
import { View, StyleSheet } from 'react-native';

import {THEME} from '../theme';
import { AppTextBold } from '../ui/AppTextBold';

export function Navbar(props) {
    return (
        <View style={styles.navbar}>
            <AppTextBold style={styles.text}>{props.title}</AppTextBold>
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