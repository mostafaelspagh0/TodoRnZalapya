import React, { useState } from 'react'
import {
  Button,
  ScrollView,
  TextInput,
  View,
  Text,
  StyleSheet,
  Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch, useAppSelector } from '../redux/store'
import {
  addTodoList,
  deleteTodoList,
  selectTodoLists
} from '../redux/slices/todolists/todoListsSlice'

const Home = ({ route, navigation }: HomePageProps) => {
  const appDispatch = useAppDispatch()
  const todoLists = useAppSelector(selectTodoLists)
  const [currentTodo, setCurrentTodo] = useState('')

  const handleAddTodo = () => {
    if (currentTodo === '') return
    appDispatch(addTodoList({ title: currentTodo }))
    setCurrentTodo('')
  }

  const handleDeleteTodo = (listId: TodoListId) => {
    appDispatch(deleteTodoList({ listId }))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.addTodoSection}>
        <TextInput
          placeholder="write your todo here "
          style={styles.addTodoInput}
          onChangeText={setCurrentTodo}
          value={currentTodo}
        />
        <View style={styles.addTodoButton}>
          <Button onPress={handleAddTodo} title="add Todo" color={'green'} />
        </View>
      </View>
      <ScrollView>
        {todoLists.todoLists.map((todoList: TodoList) => (
          <Pressable
            onPress={() =>
              navigation.navigate('TodoList', { listId: todoList.listId })
            }
            onLongPress={() => handleDeleteTodo(todoList.listId)}
            key={todoList.listId}
          >
            <View style={styles.todoItem}>
              <Text style={styles.todoTile}>{todoList.listName}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  addTodoSection: {
    flexDirection: 'row'
  },
  addTodoInput: {
    flex: 1,
    borderWidth: 1,
    margin: 10,
    padding: 10
  },
  addTodoButton: {
    justifyContent: 'center',
    margin: 10
  },
  todoItem: {
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1
  },
  todoTile: { flex: 1, fontSize: 16 },
  todoActions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  todoAciton: {
    margin: 10
  }
})

export default Home
