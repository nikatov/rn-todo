import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { AddTodo } from './src/AddTodo';
import { Navbar } from './src/Navbar';
import { Todo } from './src/Todo';

export default function App() {
  const [state, setState] = useState([]);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title
    };
    setState(prevState => [...prevState, newTodo]);
  }

  function removeTodo(id) {
    console.log('remove', id);
    setState(prev => prev.filter(el => el.id != id));
  }

  return (
    <View >
      <Navbar title='To-Do App'/>
      <View style={styles.mainWindow}>
        <AddTodo onSubmit={addTodo}/>
        <FlatList
          keyExtractor={item => item.id.toString()}
          data={state}
          renderItem={({item}) => {
            return (
              <Todo
                todo={item}
                onRemove={removeTodo}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWindow: {
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});
