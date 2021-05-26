import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';
import { THEME } from './src/theme';

async function loadApplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [todos, setTodos] = useState([
    // {id: '1', title: 'Выучить React Native'},
    // {id: '2', title: 'Написать приложение'}
  ]);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    );
  }

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title
    };
    setTodos(prevState => [...prevState, newTodo]);
  }

  function removeTodo(id) {
    const selectedTodo = todos.find(todo => todo.id == id);
    Alert.alert(
      "Удаление элемента",
      `Вы уверены, что хотите удалить заметку '${selectedTodo.title}' ?`,
      [
        {
          text: "Отмена",
          style: "cancel",
        },
        {
          text: "Удалить",
          onPress: () => {
            setTodoId(null);
            setTodos(prev => prev.filter(el => el.id != id));
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  }

  const updateTodo = (id, title) => {
    setTodos(old => old.map(todo => {
      if (todo.id === id) {
        todo.title = title;
      }
      return todo;
    }))
  }

  function openTodo(id) {
    setTodoId(id)
  }

  function goBack() {
    setTodoId(null)
  }

  let content =
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      openTodo={openTodo}
    />

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id == todoId);
    content =
    <TodoScreen
      goBack={goBack}
      todo={selectedTodo}
      onRemove={removeTodo}
      onSave={updateTodo}
    />
  }

  return (
    <View >
      <Navbar title='To-Do App'/>
      <View style={styles.mainWindow}>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWindow: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 8
  }
});
