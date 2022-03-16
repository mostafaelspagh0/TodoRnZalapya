import React, { useEffect, useState } from "react"
import {
  StyleSheet,
  Button,
  TextInput,
  Text,
  View,
  ScrollView,
  Pressable,
  ViewStyle,
} from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import { FontAwesome5 } from "@expo/vector-icons"
import AsyncStorage from "@react-native-async-storage/async-storage"

const MyCheckbox = ({
  checked = false,
  onChange,
  style,
}: {
  checked?: boolean
  onChange: () => void
  style?: ViewStyle
}) => {
  return (
    <Pressable
      style={[style, styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}
    >
      {checked && <FontAwesome5 name="check" size={16} color="white" />}
    </Pressable>
  )
}

interface Todo {
  id: TodoId
  title: string
  done: boolean
}

type TodoId = number
let counter = Math.random() * 1000 // get random int

const getTodoId = (function () {
  return function () {
    counter += 1
    return counter
  }
})()
export default function App() {
  useEffect(() => {
    AsyncStorage.getItem("todos").then((todos) => {
      if (todos) {
        setTodos(JSON.parse(todos))
      }
    })
  }, [])
  const [todos, setTodos] = useState<Todo[]>([])
  const [currentTodo, setCurrentTodo] = useState("")

  const addTodo = async (todo: string) => {
    await AsyncStorage.setItem(
      "todos",
      JSON.stringify([{ id: getTodoId(), title: todo, done: false }, ...todos])
    )

    setTodos(() => [{ id: getTodoId(), title: todo, done: false }, ...todos])
  }

  const handleAddTodo = () => {
    if (currentTodo === "") return
    addTodo(currentTodo)
    setCurrentTodo("")
  }

  const handleToggleDone = (todoId: TodoId) => {
    AsyncStorage.setItem(
      "todos",
      JSON.stringify(
        todos.map((todo) =>
          todo.id === todoId ? { ...todo, done: !todo.done } : todo
        )
      )
    )
    setTodos(() =>
      todos.map((todo) =>
        todo.id === todoId ? { ...todo, done: !todo.done } : todo
      )
    )
  }

  const handleDeleteTodo = (todoId: TodoId) => {
    AsyncStorage.setItem(
      "todos",
      JSON.stringify(todos.filter((todo) => todo.id !== todoId))
    )
    setTodos(() => todos.filter((todo) => todo.id !== todoId))
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.addTodoSection}>
          <TextInput
            placeholder="write your todo here "
            style={styles.addTodoInput}
            onChangeText={setCurrentTodo}
            value={currentTodo}
          />
          <View style={styles.addTodoButton}>
            <Button onPress={handleAddTodo} title="add Todo" color={"green"} />
          </View>
        </View>
        <ScrollView>
          {todos.map((todo: Todo) => (
            <View key={todo.id} style={styles.todoItem}>
              <Text style={styles.todoTile}>{todo.title}</Text>
              <View style={styles.todoActions}>
                <Pressable
                  style={styles.todoAciton}
                  onPress={(e) => handleDeleteTodo(todo.id)}
                >
                  <FontAwesome5 name="trash" size={24} color="red" />
                </Pressable>
                <MyCheckbox
                  style={styles.todoAciton}
                  onChange={() => handleToggleDone(todo.id)}
                  checked={todo.done}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addTodoSection: {
    flexDirection: "row",
  },
  addTodoInput: {
    flex: 1,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  addTodoButton: {
    justifyContent: "center",
    margin: 10,
  },
  todoItem: {
    margin: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "green",
    backgroundColor: "transparent",
  },

  checkboxChecked: {
    backgroundColor: "green",
  },
  todoTile: { flex: 1, fontSize: 16 },
  todoActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  todoAciton: {
    margin: 10,
  },
})
