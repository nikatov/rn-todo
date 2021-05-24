import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Navbar } from './src/components/Navbar';
import { MainScreen } from './src/screens/MainScreen';
import { TodoScreen } from './src/screens/TodoScreen';


export default function App() {
  const [todoId, setTodoId] = useState('2');
  const [todos, setTodos] = useState([
    {id: '1', title: 'Выучить React Native'},
    {id: '2', title: 'Написать приложение'}
  ]);

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now().toString(),
      title: title
    };
    setTodos(prevState => [...prevState, newTodo]);
  }

  function removeTodo(id) {
    console.log('remove', id);
    setTodos(prev => prev.filter(el => el.id != id));
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
    content = <TodoScreen goBack={goBack} todo={selectedTodo}/>
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
    paddingHorizontal: 16,
    paddingVertical: 8
  }
});
