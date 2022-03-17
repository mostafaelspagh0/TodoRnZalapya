import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Button,
  TextInput,
  Text,
  View,
  ScrollView,
  Pressable,
  ViewStyle,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import { Provider } from "react-redux";
import store, { persistor, useAppDispatch, useAppSelector } from "./redux/store";
import {
  addTodo,
  deleteTodo,
  markTodoDone,
  selectTodo,
} from "./redux/slices/todo/todoSlice";
import { PersistGate } from "redux-persist/integration/react";


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
});

const MyCheckbox = ({
  checked = false,
  onChange,
  style,
}: {
  checked?: boolean;
  onChange: () => void;
  style?: ViewStyle;
}) => {
  return (
    <Pressable
      style={[style, styles.checkboxBase, checked && styles.checkboxChecked]}
      onPress={onChange}
    >
      {checked && <FontAwesome5 name="check" size={16} color="white" />}
    </Pressable>
  );
};

function App() {
  const appDispatch = useAppDispatch();
  const todos: TodoState = useAppSelector(selectTodo);
  const [currentTodo, setCurrentTodo] = useState("");

  const handleAddTodo = () => {
    if (currentTodo === "") return;
    appDispatch(addTodo(currentTodo));
    setCurrentTodo("");
  };

  const handleToggleDone = (todoId: TodoId) => {
    appDispatch(markTodoDone(todoId));
  };

  const handleDeleteTodo = (todoId: TodoId) => {
    appDispatch(deleteTodo(todoId));
  };

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
          <Button onPress={handleAddTodo} title="add Todo" color={"green"} />
        </View>
      </View>
      <ScrollView>
        {todos.todos.map((todo: Todo) => (
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
  );
}

const main = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <App />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default main;

