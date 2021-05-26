import React, { useState, useEffect } from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions} from 'react-native';
import {AddTodo} from '../components/AddTodo';
import {Todo} from '../components/Todo';
import { THEME } from '../theme';


export const MainScreen = ({addTodo, removeTodo, todos, openTodo}) => {
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - 2 * THEME.PADDING_HORIZONTAL);
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
                            onOpen={openTodo}
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
    }
});