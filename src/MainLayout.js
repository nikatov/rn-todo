import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';

import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { Navbar } from './components/Navbar';
import { THEME } from './theme';

export const MainLayout = () => {
    const [todoId, setTodoId] = useState(null);
    const [todos, setTodos] = useState([
      // {id: '1', title: 'Выучить React Native'},
      // {id: '2', title: 'Написать приложение'}
    ]);

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