interface Todo {
  id: TodoId
  title: string
  done: boolean
}

type TodoId = number
type TodoListId = number

interface TodoList {
  todos: Todo[]
  lastId: TodoId
  listId: TodoListId
  listName: string
}

interface todoLists {
  todoLists: TodoList[]
  lastListId: TodoListId
}

type RootStackParamList = {
  Home: undefined
  TodoList: { listId: TodoListId }
}

type HomePageProps = import('@react-navigation/stack').StackScreenProps<
  RootStackParamList,
  'Home'
>

type TodoListPageProps = import('@react-navigation/stack').StackScreenProps<
  RootStackParamList,
  'TodoList'
>