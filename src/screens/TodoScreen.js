import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons'

import {THEME} from '../theme';
import {AppCard} from '../ui/AppCard';
import {EditModal} from '../components/EditModal';
import { AppTextBold } from '../ui/AppTextBold';
import { AppButton } from '../ui/AppButton';

export const TodoScreen = ({todo, goBack, onRemove, onSave}) => {
    const [model, setModel] = useState(false);

    const saveHandler = title => {
        onSave(todo.id, title);
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
                        onPress={goBack}
                    >
                        <AntDesign name='back' size={20} color="#fff"/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton
                        color={THEME.DANGER_COLOR}
                        onPress={() => onRemove(todo.id)}
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
        width: '40%'
    },
    title: {
        fontSize: 20
    }
});